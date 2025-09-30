import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import TodoDetail from "./pages/Details";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
     <Router>
      <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
        </Routes>
     </Router>
    </>
  )
}

export default App;
