import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/todos/${id}`)
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [id]);

  if (!todo) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Todo Detail</h1>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">ID:</span>
            <span className="text-gray-800">{todo.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Title:</span>
            <span className="text-gray-800">{todo.task}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-600">Completed:</span>
            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${
                todo.status ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {todo.status ? "Yes" : "No"}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TodoDetail;
