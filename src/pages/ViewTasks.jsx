// ViewTasks.jsx - Enhanced with better card design and filtering
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit3, Trash2, Calendar, Flag, Filter } from "lucide-react";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

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

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/delete/${id}/`);
      const successEvent = new CustomEvent('taskSuccess', { 
        detail: { message: 'Task deleted successfully!', type: 'success' } 
      });
      window.dispatchEvent(successEvent);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorEvent = new CustomEvent('taskError', { 
        detail: { message: 'Failed to delete task!', type: 'error' } 
      });
      window.dispatchEvent(errorEvent);
    }
  };

  const updateTask = (id) => {
    navigate(`/update/${id}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-50";
      case "medium": return "text-yellow-500 bg-yellow-50";
      case "low": return "text-green-500 bg-green-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-500 bg-green-50";
      case "in_progress": return "text-blue-500 bg-blue-50";
      case "pending": return "text-gray-500 bg-gray-50";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your Tasks</h1>
            <p className="text-gray-600">Manage and track your progress</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <Filter size={16} className="text-gray-500" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <Clipboard size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-4">
              {filter === "all" 
                ? "Get started by creating your first task!" 
                : `No ${filter} tasks found.`}
            </p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                View all tasks
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                      {task.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      <Flag size={12} />
                      {task.priority}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                    {task.due_date && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-50">
                        <Calendar size={12} />
                        {task.due_date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:flex-col">
                  <button
                    onClick={() => updateTask(task.id)}
                    className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium sm:w-32"
                  >
                    <Edit3 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center justify-center gap-1 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors text-sm font-medium sm:w-32"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{tasks.length}</div>
              <div className="text-blue-100 text-sm">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-blue-100 text-sm">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {tasks.filter(t => t.status === 'pending').length}
              </div>
              <div className="text-blue-100 text-sm">Pending</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}