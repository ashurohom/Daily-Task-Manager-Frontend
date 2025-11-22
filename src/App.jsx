// App.jsx - Updated with conditional layout
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import ViewTasks from "./pages/ViewTasks";
import UpdateTask from "./pages/UpdateTask";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page without Layout wrapper */}
        <Route path="/" element={<Home />} />
        
        {/* Other pages with Layout wrapper */}
        <Route path="/add" element={
          <Layout>
            <AddTask />
          </Layout>
        } />
        <Route path="/view" element={
          <Layout>
            <ViewTasks />
          </Layout>
        } />
        <Route path="/update/:id" element={
          <Layout>
            <UpdateTask />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}