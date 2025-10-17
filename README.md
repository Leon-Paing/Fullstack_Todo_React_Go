## Fullstack Todo App with React(Frontend) & Go(Backend)

A simple fullstack TODO application built with **React** for the frontend and **Go (Echo)** for the backend. The app allows users to manage tasks efficiently with CRUD operations and detailed task views.

---

## Features

- **List TODOs** – View all tasks.
- **Add TODO** – Create new tasks.
- **Check Done TODO** – Mark tasks as completed.
- **Delete TODO** – Remove tasks.
- **Detail View** – View detailed information for each TODO.

---

## File Structure

### Frontend (React)
client/Todo_Client_React/src/pages

├── Home.jsx       -> Main page for listing, adding, deleting, and checking TODOs <br>
└── Details.jsx    -> Page to view detailed information of a TODO
---
### Backend (Go)
server/

├── todoCRUD.go -> main function with API routes
---
## Getting Started

### Go
```bash
cd server
```

#### Initialize go module
```bash
go mod tidy
```

#### Start Go server
```bash
go run todoCRUD.go
```

### React
```bash
cd client/Todo_Client_React
```
#### Install dependencies
```bash
npm i
```
#### Start the server
```bash
npm run dev
```
