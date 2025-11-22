import { useState } from "react";

function AddTask() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");

  // For showing messages
  const [message, setMessage] = useState("");

  // FUNCTION TO SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload

    const newTask = {
      title: title,
      description: description,
      due_date: dueDate,
      status: status,
      priority: priority,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setMessage("Task created successfully!");
        setTitle("");
        setDescription("");
        setDueDate("");
        setStatus("pending");
        setPriority("medium");
      } else {
        setMessage("Failed to create task!");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error: Could not connect to server");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Task</h1>

      {message && (
        <p className="mb-4 text-center font-semibold text-green-600">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-xl space-y-4"
      >
        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Due Date */}
        <div>
          <label className="font-semibold">Due Date</label>
          <input
            type="date"
            className="border p-2 w-full rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold">Status</label>
          <select
            className="border p-2 w-full rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="font-semibold">Priority</label>
          <select
            className="border p-2 w-full rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-bold"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;
