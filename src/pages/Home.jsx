// Home.jsx - Full Screen Colorful Design
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Target, Rocket, TrendingUp, Users, Star, ArrowRight, Plus } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Smart Organization",
      description: "Effortlessly manage tasks with intuitive drag-and-drop interface and smart categorization",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Daily Planning",
      description: "Plan your day with smart due dates, reminders, and progress tracking features",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Tracking",
      description: "Set and achieve your goals with visual progress indicators and completion analytics",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Productivity Insights",
      description: "Get detailed analytics about your productivity patterns and task completion rates",
      color: "from-orange-500 to-red-500"
    }
  ];

  const stats = [
    { number: "99%", label: "Task Completion" },
    { number: "24/7", label: "Availability" },
    { number: "∞", label: "Tasks Limit" },
    { number: "100%", label: "Free to Use" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white">
      {/* Navigation Bar - Transparent */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                TaskFlow
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => navigate("/view")}
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                My Tasks
              </button>
              <button 
                onClick={() => navigate("/add")}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/30">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white">Trusted by 10,000+ users worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Organize Your
            <span className="text-white block">
              Daily Life
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            The ultimate task management app that helps you stay productive, organized, and focused on what matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => navigate("/add")}
              className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
            >
              <span>Start Managing Tasks</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate("/view")}
              className="group border-2 border-white bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
            >
              <span>View All Tasks</span>
              <Users className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Everything You Need to
              <span className="text-white block">
                Stay Productive
              </span>
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Powerful features designed to streamline your workflow and boost your productivity to new heights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Transform Your
              <span className="text-white block">
                Productivity?
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already revolutionized their task management experience.
            </p>
            <button
              onClick={() => navigate("/add")}
              className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Create Your First Task Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">TaskFlow Pro</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-white/80 mb-2">
                © {new Date().getFullYear()} Daily Task Manager. Built with ❤️ by <span className="font-semibold text-white">Ashu</span>
              </p>
              <p className="text-white/60 text-sm">
                Designed for productivity • Perfect for mobile & desktop • 100% Free Forever
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 md:hidden z-50">
        <button
          onClick={() => navigate("/add")}
          className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}