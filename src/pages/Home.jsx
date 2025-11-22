import { CheckCircle, Calendar, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();  // ⭐ FIXED — Router navigation

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white flex flex-col">

      {/* Main Section */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 text-center drop-shadow-lg">
          Daily Task Manager
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl text-center mb-10">
          A simple and powerful tool to organize your work, boost your productivity,
          and track your daily achievements effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/add")}   // ⭐ FIXED
            className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-200"
          >
            Add Tasks
          </button>

          <button
            onClick={() => navigate("/view")}  // ⭐ FIXED
            className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-200"
          >
            View Tasks
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white text-blue-900 w-full rounded-t-3xl px-6 py-12 shadow-2xl">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Why Use Daily Task Manager?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* Feature 1 */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <CheckCircle size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-blue-700">
              Easily add, edit, and manage tasks with clean and simple controls.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <Calendar size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Daily Planning</h3>
            <p className="text-blue-700">
              Plan your day in advance and track your progress instantly.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-blue-50 p-6 rounded-2xl shadow hover:scale-105 transition-all">
            <ClipboardList size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Everything</h3>
            <p className="text-blue-700">
              Get a full overview of completed, pending, and upcoming tasks.
            </p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-blue-900 text-center text-blue-200 text-sm">
        © {new Date().getFullYear()} Daily Task Manager | Built by <span className="font-semibold">Ashu</span>
      </footer>
    </div>
  );
}
