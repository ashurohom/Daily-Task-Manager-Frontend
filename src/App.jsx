import { useState } from "react";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";

export default function App() {
  const [page, setPage] = useState("home");

  const handleNavigation = (nextPage) => {
    setPage(nextPage);
  };

  return (
    <>
      {page === "home" && <Home onNavigate={handleNavigation} />}
      {page === "add" && <AddTask onNavigate={handleNavigation} />}
      {page === "view" && <ViewTasks onNavigate={handleNavigation} />}
      
    </>
  );
}
