// components/Layout.jsx - Updated with Home screen button
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Plus, List } from "lucide-react";

// Layout component wrapping pages with header and bottom nav
export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

// Determine visibility of back and home buttons  
  const showBackButton = location.pathname !== "/";
  const showHomeButton = location.pathname !== "/";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {showBackButton && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  title="Go Back"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <h1 className="text-xl font-bold">Task Manager</h1> 
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Home Screen Button - Shows on all pages except home */}
              {showHomeButton && (
                <button
                  onClick={() => navigate("/")}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center space-x-1"
                  title="Go to Home Screen"
                >
                  <Home size={18} />
                  <span className="text-sm hidden sm:inline">Home</span>
                </button>
              )}
              
              {/* Version badge - Only shows on home page */}
              {location.pathname === "/" && (
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  v1.0
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Of Page */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center shadow-2xl md:hidden">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            location.pathname === "/" ? "text-blue-600 bg-blue-50" : "text-gray-600"
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button
          onClick={() => navigate("/add")}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            location.pathname === "/add" ? "text-blue-600 bg-blue-50" : "text-gray-600"
          }`}
        >
          <Plus size={20} />
          <span className="text-xs mt-1">Add</span>
        </button>
        
        <button
          onClick={() => navigate("/view")}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            location.pathname === "/view" ? "text-blue-600 bg-blue-50" : "text-gray-600"
          }`}
        >
          <List size={20} />
          <span className="text-xs mt-1">View</span>
        </button>
      </nav>
    </div>
  );
}