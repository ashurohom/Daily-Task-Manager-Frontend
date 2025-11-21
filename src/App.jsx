import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [page, setPage] = useState("home");

  const handleNavigation = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <>
      {page === "home" && <Home onNavigate={handleNavigation} />}
      {page === "add" && <div>Add Task Screen Coming Soon...</div>}
      {page === "view" && <div>View Tasks Screen Coming Soon...</div>}
    </>
  );
}

export default App;
