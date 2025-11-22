import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateTask() {
  const { id } = useParams(); // get task id from URL
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    priority: "low",
    status: "pending",
  });

  const [loading, setLoading] = useState(true);

  // 🔵 Fetch task details by ID
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/posts/list/");
        const foundTask = res.data.find((t) => t.id === Number(id));

        if (!foundTask) {
          alert("Task not found!");
          navigate("/view");
        } else {
          setTask(foundTask);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading task:", err);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  // 🔵 Update values on form change
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 🔵 Submit update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/posts/update/${id}/`,
        task
      );

      alert("Task updated successfully!");
      navigate("/view");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Error updating task");
    }
  };

  if (loading) return <p className="p-10 text-xl">Loading task...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-2xl border">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Update Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block font-semibold mb-1">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={task.due_date || ""}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block font-semibold mb-1">Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}
