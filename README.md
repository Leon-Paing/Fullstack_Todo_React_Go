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
---
├── Home.jsx       # Main page for listing, adding, deleting, and checking TODOs
└── Details.jsx    # Page to view detailed information of a TODO

server/

├── todoCRUD.go # main function with API routes

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

MIT License

Copyright (c) 2025 Yan Pai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
