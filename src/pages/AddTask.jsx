export default function AddTask({ onNavigate }) {
  return (
    <div>
      <h1>Add Task Page</h1>
      <button onClick={() => onNavigate("home")}>Back</button>
    </div>
  );
}
