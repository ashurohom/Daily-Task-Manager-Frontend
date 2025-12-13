// ViewTasks.jsx - Updated with Pagination
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Edit3, Trash2, Calendar, Flag, Filter, Clipboard, ChevronLeft, ChevronRight } from "lucide-react";

export default function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);
  const [pageSize] = useState(5); // Should match your backend PAGE_SIZE
  
  const navigate = useNavigate();

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      // Add pagination parameter to API call
      const response = await axios.get(
        // `http://127.0.0.1:8000/api/posts/list/?page=${page}`
        `https://daily-task-manager-backend-production.up.railway.app/api/posts/list/?page=${page}`
      );
      
      // Extract pagination data from response
      if (response.data.results) {
        setTasks(response.data.results);
        setTotalTasks(response.data.count || 0);
        setTotalPages(Math.ceil((response.data.count || 0) / pageSize));
      } else {
        setTasks(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(currentPage);
  }, [currentPage]);

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`https://daily-task-manager-backend-production.up.railway.app/api/posts/delete/${id}/`);
      const successEvent = new CustomEvent('taskSuccess', { 
        detail: { message: 'Task deleted successfully!', type: 'success' } 
      });
      window.dispatchEvent(successEvent);
      // Refetch current page after deletion
      fetchTasks(currentPage);
    } catch (error) {
      console.error("Error deleting task:", error);
      const errorEvent = new CustomEvent('taskError', { 
        detail: { message: 'Failed to delete task!', type: 'error' } 
      });
      window.dispatchEvent(errorEvent);
    }
  };
// Navigate to update page
  const updateTask = (id) => {
    navigate(`/update/${id}`);
  };

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Next and Previous handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  // Calculate displayed tasks range
  const startTask = (currentPage - 1) * pageSize + 1;
  const endTask = Math.min(currentPage * pageSize, totalTasks);
  // loading state
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

        {/* Stats */}
        {totalTasks > 0 && (
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{totalTasks}</div>
                <div className="text-blue-100 text-sm">Total Tasks</div>
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
              <div>
                <div className="text-2xl font-bold">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="text-blue-100 text-sm">Current Page</div>
              </div>
            </div>
          </div>
        )}
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
        <>
          <div className="grid gap-4 mb-6">
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
                          {new Date(task.due_date).toLocaleDateString()}
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

          {/* Pagination Component */}
          {totalPages > 1 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-gray-600 text-sm">
                  Showing <span className="font-semibold">{startTask}-{endTask}</span> of{" "}
                  <span className="font-semibold">{totalTasks}</span> tasks
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Page Jump */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 text-sm">Go to page:</span>
                  <select
                    value={currentPage}
                    onChange={(e) => goToPage(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <option key={page} value={page}>
                        {page}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Simple Pagination for Mobile */}
              <div className="flex items-center justify-between mt-4 sm:hidden">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <span className="text-gray-700 font-medium">
                  {currentPage} / {totalPages}
                </span>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}