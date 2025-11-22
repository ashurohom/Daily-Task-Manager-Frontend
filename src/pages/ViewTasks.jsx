import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟦 Fetch tasks on page load
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/posts/list/");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🟥 Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}/`);
      alert("Task deleted successfully!");
      fetchTasks(); // refresh after delete
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // 🟧 Update button (navigate page)
  // const updateTask = (id) => {
  //   window.location.href = `/update/${id}`;  

  const navigate = useNavigate();

  const updateTask = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Tasks</h2>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-600 text-lg">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700">{task.title}</h3>

              <p className="text-gray-700 mt-2">
                {task.description || "No description"}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                <strong>Due:</strong> {task.due_date || "Not set"}
              </p>

              <p className="mt-1 text-sm">
                <span className="font-semibold">Priority:</span>{" "}
                <span
                  className={
                    task.priority === "high"
                      ? "text-red-600"
                      : task.priority === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {task.priority}
                </span>
              </p>

              <p className="mt-1 text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={
                    task.status === "completed"
                      ? "text-green-600"
                      : task.status === "in_progress"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }
                >
                  {task.status}
                </span>
              </p>

              {/* Buttons */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => updateTask(task.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
