// AddTask.jsx - Enhanced with better error handling and debugging
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, Calendar, Flag, Clipboard, Star } from "lucide-react";

function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "pending",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data with proper values
    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim() || "", // Ensure string
      due_date: formData.due_date || null, // Send null if empty
      status: formData.status,
      priority: formData.priority,
    };

    console.log("📤 Sending data to backend:", submitData);

    try {
      const response = await fetch("https://daily-task-manager-backend-production.up.railway.app/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const responseData = await response.json();
      console.log("📥 Response status:", response.status);
      console.log("📥 Response data:", responseData);

      if (response.ok) {
        // Show success message
        const successEvent = new CustomEvent('taskSuccess', { 
          detail: { message: 'Task created successfully!', type: 'success' } 
        });
        window.dispatchEvent(successEvent);
        
        // Reset form
        setFormData({
          title: "",
          description: "",
          due_date: "",
          status: "pending",
          priority: "medium",
        });
        
        // Navigate back after short delay
        setTimeout(() => navigate("/view"), 1000);
      } else {
        console.error("Server error:", responseData);
        
        // Show detailed error message
        let errorMessage = 'Failed to create task!';
        if (responseData.error) {
          errorMessage = responseData.error;
        } else if (responseData.details) {
          errorMessage = `Validation error: ${JSON.stringify(responseData.details)}`;
        } else if (responseData.message) {
          errorMessage = responseData.message;
        }
        
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      const errorEvent = new CustomEvent('taskError', { 
        detail: { message: `Failed: ${error.message}`, type: 'error' } 
      });
      window.dispatchEvent(errorEvent);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Form Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Save size={28} />
            Create New Task
          </h1>
          <p className="text-blue-100 mt-1">Fill in your task details below</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Clipboard size={16} />
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter task title..."
              required
              minLength="1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows="3"
              placeholder="Describe your task..."
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} />
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Priority & Status Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Flag size={16} />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Show Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Star size={16} />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Task...
              </div>
            ) : (
              "Create Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;