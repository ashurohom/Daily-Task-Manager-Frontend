import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";
import UpdateTask from "./pages/UpdateTask";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/view" element={<ViewTasks />} />
        <Route path="/update/:id" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}
