package main

import (
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Todo struct {
	ID     int    `json:"id"`
	Task   string `json:"task" validate:"required,min=3"`
	Status bool   `json:"status"`
}

var todos = []Todo{
	{ID: 1, Task: "Learn Go", Status: false},
	{ID: 2, Task: "Build a REST API", Status: false},
	{ID: 3, Task: "Write unit tests", Status: false},
}

var validate = validator.New()

func main() {
	e := echo.New()

	e.HTTPErrorHandler = customHttpErrorHandler

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	e.GET("/todos", listAllTodos)
	e.GET("/todos/:id", getTodoById)
	e.POST("/todos", addTodo)
	e.DELETE("todos/:id", deleteTodo)
	e.PUT("/todos/:id", MarkDone)

	e.Logger.Fatal(e.Start(":8088"))
}

func listAllTodos(c echo.Context) error {
	return c.JSON(http.StatusOK, todos)
}

func getTodoById(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadGateway, "Invalid ID")
	}

	for _, todo := range todos {
		if todo.ID == id {
			return c.JSON(http.StatusOK, todo)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, "Todo Not Found")
}

func addTodo(c echo.Context) error {
	var newTodo Todo
	if err := c.Bind(&newTodo); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid Type Error")
	}

	if err := validate.Struct(newTodo); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	lastElement := todos[len(todos)-1]
	newTodo.ID = lastElement.ID + 1
	newTodo.Status = false
	todos = append(todos, newTodo)

	return c.JSON(http.StatusCreated, newTodo)
}

func MarkDone(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}

	for i, t := range todos {
		if t.ID == id {
			todos[i].Status = true
			return c.JSON(http.StatusOK, t)
		}
	}

	return echo.NewHTTPError(http.StatusNotFound, "Todo Not Found")
}

func deleteTodo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid ID")
	}

	for i, t := range todos {
		if t.ID == id {
			todos = append(todos[:i], todos[i+1:]...)
			c.JSON(http.StatusOK, todos)
		}
	}

	return echo.NewHTTPError(http.StatusInternalServerError, "Server Error")
}

func customHttpErrorHandler(err error, c echo.Context) {
	code := http.StatusInternalServerError
	var message interface{} = "Something went wrong"

	if he, ok := err.(*echo.HTTPError); ok {
		code = he.Code
		message = he.Message
	}

	c.JSON(code, map[string]interface{}{
		"error":  message,
		"status": code,
		"path":   c.Request().URL,
		"method": c.Request().Method,
	})
}
