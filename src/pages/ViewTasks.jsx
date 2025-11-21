export default function ViewTasks({ onNavigate }) {
  return (
    <div>
      <h1>View Tasks Page</h1>
      <button onClick={() => onNavigate("home")}>Back</button>
    </div>
  );
}
