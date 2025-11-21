export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-400 flex flex-col items-center justify-center text-white px-6">

      {/* Title Section */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 text-center drop-shadow-lg">
        Daily Task Manager
      </h1>

      <p className="text-lg md:text-xl text-blue-100 max-w-xl text-center mb-10">
        Organize your daily work, track progress, and stay productive with ease.
      </p>

      {/* Buttons Section */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

        <button
          onClick={() => onNavigate("login")}
          className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-100 hover:scale-105 transition-all duration-200"
        >
          Add Task
        </button>

        <button
          onClick={() => onNavigate("register")}
          className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition-all duration-200"
        >
          View Tasks
        </button>
      </div>

      {/* Footer Section */}
      <p className="text-sm text-blue-200 mt-14">
        ✨ Designed by <span className="font-semibold">Ashu</span>
      </p>
    </div>
  );
}
