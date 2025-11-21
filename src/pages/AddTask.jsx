import { useState } from "react";

export default function AddTask({ onNavigate }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");     // For showing messages

  const handleSubmit = async (e) => {
    e.preventDefault();     //stop page reload

    const newTask ={
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
      priority: priority, 
    };

    
  }


  return (
    <div>
      <h1>Add Task Page</h1>
      <button onClick={() => onNavigate("home")}>Back</button>
    </div>
  );
}
