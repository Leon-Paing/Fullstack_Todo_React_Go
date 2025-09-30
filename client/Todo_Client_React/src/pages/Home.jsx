import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8088/todos")
      .then((res) => res.json())
      .then((data) =>
        setTodos(data.map((todo) => ({ ...todo, visible: true })))
      );
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo = { task: newTodo };

    fetch("http://localhost:8088/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([{ ...data, visible: false }, ...todos]);
        setNewTodo("");
        setTimeout(() => {
          setTodos((prev) =>
            prev.map((t) => (t.id === data.id ? { ...t, visible: true } : t))
          );
        }, 50);
      })
      .then(() => toast.success("New Todo added!"));
  }

  function checkDone(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    fetch(`http://localhost:8088/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, status: !todo.status }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: data.status } : t))
        );
      })
      .then(() => toast.success("Todo checked!"));;
    }

  function deleteTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
    );
    setTimeout(() => {
      fetch(`http://localhost:8088/todos/${id}`, { method: "DELETE" }).then(
        () => setTodos((prev) => prev.filter((todo) => todo.id !== id))
      )
      .then(() => toast.success("Todo deleted!"));;
    }, 300);
  }

  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6 mt-16">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          ✨ Todo List
        </h1>

        <form
          onSubmit={addTodo}
          className="flex flex-col sm:flex-row mb-6 gap-3"
        >
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="New todo..."
            className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-3 rounded-lg shadow transition"
          >
            Add
          </button>
        </form>

        <div className="space-y-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition p-3 rounded-lg shadow-sm transform ${
                todo.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } transition-all duration-300`}
            >
              <div
                onClick={() => {
                    navigate(`/todos/${todo.id}`)
                }}
              >
                <span className={`text-blue-700 font-medium cursor-pointer hover:underline ${
                  todo.status ? "line-through text-gray-400" : ""
                }`}>{todo.task}</span>
                
                <span
                className={`ml-3 px-2 py-1 text-xs rounded-full text-white none ${
                  todo.status ? "bg-green-500" : "bg-blue-500"
                  }`}
              >
                  {todo.status ? "Done" : "Pending"}
                </span>

              </div>
              

              <div className="flex items-center gap-4">
                
                <input
                  type="checkbox"
                  checked={todo.status}
                  disabled={todo.status}
                  onChange={(e) => {
                    e.stopPropagation();
                    checkDone(todo.id);
                  }}
                  className="w-5 h-5 cursor-pointer"
                />
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 italic">No todos yet 🚀</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
