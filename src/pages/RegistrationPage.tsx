import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Star, 
  ArrowRight, 
  Play, 
  Sparkles,
  CheckCircle2,
  Zap,
  Target,
  Award,
  Menu,
  X,
  Lightbulb,
  Brain,
  Trophy,
  TrendingUp,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../components/ui/Footer";


const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // Default dark mode enabled


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const stats = [
    { icon: Users, number: "10K+", label: "Active Students", color: "from-cyan-500 to-blue-500" },
    { icon: GraduationCap, number: "500+", label: "Teachers Assisted", color: "from-purple-500 to-pink-500" },
    { icon: BookOpen, number: "50+", label: "Subject Covered", color: "from-orange-500 to-red-500" },
    { icon: Star, number: "4.9", label: "User Satisfaction", color: "from-green-500 to-emerald-500" }
  ];


  const features = [
    {
      icon: Zap,
      title: "Instant Doubt Solver",  
      description: "Get answers to any academic question instantly with AI-powered explanations",
      gradient: "from-orange-400 to-orange-600"
    },
    {
      icon: CheckCircle2,
      title: "Quality Content",
      description: "Curated courses designed for effective learning",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Interactive Learning",
      description: "Engaging multimedia content and practical exercises",
      gradient: "from-blue-500 to-indigo-600"
    }
  ];


  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];


  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };


  return (
    <div className={`min-h-screen w-full overflow-x-hidden transition-all duration-700 ${
      darkMode 
        ? 'bg-slate-950' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b w-full transition-all duration-700 ${
        darkMode 
          ? 'bg-slate-950/80 border-slate-800/50' 
          : 'bg-white/70 border-gray-200/30'
      }`}>
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <span className={`text-2xl font-bold transition-all duration-700 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>Sahayak</span>
            </div>


            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-medium transition-all duration-700 cursor-pointer ${
                    darkMode 
                      ? 'text-slate-300 hover:text-cyan-400' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>


            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2.5 rounded-full transition-all duration-700 ${
                  darkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400' 
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" strokeWidth={2} /> : <Moon className="w-5 h-5" strokeWidth={2} />}
              </button>


              <Button
                variant="ghost"
                className={`transition-all duration-700 ${
                  darkMode 
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => navigate('/login/student')}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                onClick={() => navigate('/login/student')}
              >
                Get Started
              </Button>
            </div>


            <button
              className={`md:hidden transition-all duration-700 ${darkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>


        {mobileMenuOpen && (
          <div className={`md:hidden backdrop-blur-xl border-t transition-all duration-700 ${
            darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/90 border-gray-200'
          }`}>
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`block font-medium py-2 transition-all duration-700 cursor-pointer ${
                    darkMode ? 'text-slate-300 hover:text-cyan-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <button onClick={toggleDarkMode} className={`w-full p-3 rounded-lg transition-all duration-700 flex items-center justify-center gap-2 font-medium ${
                  darkMode ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }`}>
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <Button variant="ghost" className="w-full" onClick={() => { navigate('/login/student'); setMobileMenuOpen(false); }}>Sign In</Button>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white" onClick={() => { navigate('/login/student'); setMobileMenuOpen(false); }}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </header>


      {/* Section 1: Hero with Enhanced 3D Mockup */}
      <section className="relative pt-32 pb-32 px-6 lg:px-8 overflow-hidden min-h-screen flex items-center w-full">
        {/* Background */}
        <div className="absolute inset-0 z-0 transition-all duration-700">
          {darkMode ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"></div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
          )}
        </div>


        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {darkMode ? (
            <>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
            </>
          ) : (
            <>
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-pink-200/35 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
            </>
          )}
        </div>


        <div className="w-full max-w-[1400px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
                darkMode ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20' : 'bg-white/50 border-blue-400/40'
              }`}>
                <Sparkles className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} strokeWidth={2} />
                <span className={`text-sm font-semibold tracking-wide ${darkMode ? 'text-cyan-300' : 'text-blue-700'}`}>BEST LEARNING PLATFORM</span>
              </div>


              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Got a Doubt?{" "}
                <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  darkMode ? 'from-cyan-400 via-blue-500 to-purple-500' : 'from-blue-600 via-purple-600 to-pink-600'
                }`}>
                  Just Ask Sahayak.
                </span>
              </h1>


              <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                Your AI buddy that explains tough concepts, makes worksheets, and even plans lessons — just like your smartest study partner.
              </p>


              <div className="flex flex-wrap gap-4">
                <Button className="h-14 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-300" onClick={() => navigate('/login/student')}>
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className={`h-14 px-8 text-base font-semibold rounded-xl border-2 transition-all duration-300 ${
                  darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}>
                  Learn More
                </Button>
              </div>


              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 animate-slide-up ${
                      darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-300 shadow-sm'
                    }`} style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center gap-2">
                        <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} p-1 rounded text-white flex-shrink-0`} strokeWidth={2} />
                        <div className="min-w-0">
                          <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.number}</div>
                          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            {/* Right side - Enhanced 3D Mockup - VIBRANT NO FADE */}
            <div className="relative hidden lg:block h-full">
              <div className="relative animate-float-elegant" style={{animationDuration: '6s'}}>
                {/* Main device mockup */}
                <div className={`relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl border-3 transform transition-all duration-300 hover:shadow-3xl ${
                  darkMode 
                    ? 'bg-gray-950 border-gray-800 hover:border-cyan-500' 
                    : 'bg-white border-blue-600 shadow-[0_20px_70px_rgba(37,99,235,0.3)] hover:border-blue-700'
                }`}>
                  {/* Browser header */}
                  <div className={`h-12 flex items-center gap-2 px-4 border-b ${
                    darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-blue-300'
                  }`}>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-600"></div>
                    </div>
                    <div className={`flex-1 h-7 rounded-md mx-4 flex items-center px-3 text-xs font-bold ${
                      darkMode ? 'bg-gray-800 text-gray-200' : 'bg-blue-50 text-blue-900 border border-blue-400'
                    }`}>
                      🔒 sahayak.me/dashboard
                    </div>
                  </div>


                  {/* Content area */}
                  <div className="p-6 h-full relative overflow-hidden">
                    <div className={`absolute inset-0 ${
                      darkMode 
                        ? 'bg-gray-900' 
                        : 'bg-white'
                    }`}></div>


                    {/* Floating cards - VIBRANT */}
                    <div className="relative z-10 space-y-3">
                      {/* Card 1 - AI Chat */}
                      <div className={`p-4 rounded-2xl border-2 animate-slide-up shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        darkMode 
                          ? 'bg-gray-800 border-cyan-500' 
                          : 'bg-blue-100 border-blue-600 hover:border-blue-700'
                      }`} style={{animationDelay: '0.1s'}}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-lg">
                            <Sparkles className="w-5 h-5 text-white" strokeWidth={3} />
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-blue-950'}`}>AI Chat</div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-cyan-300' : 'text-blue-800'}`}>Instant</div>
                          </div>
                        </div>
                        <div className={`text-xs leading-relaxed font-bold ${darkMode ? 'text-gray-100' : 'text-blue-950'}`}>
                          "Explain Newton's laws"
                        </div>
                      </div>


                      {/* Card 2 - Video */}
                      <div className={`p-4 rounded-2xl border-2 animate-slide-up shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        darkMode 
                          ? 'bg-gray-800 border-purple-500' 
                          : 'bg-purple-100 border-purple-600 hover:border-purple-700'
                      }`} style={{animationDelay: '0.2s'}}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-700 flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-white" strokeWidth={3} />
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-purple-950'}`}>Video</div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Lessons</div>
                          </div>
                        </div>
                        <div className={`h-16 rounded-lg flex items-center justify-center border-2 ${
                          darkMode 
                            ? 'bg-gray-900 border-gray-700' 
                            : 'bg-purple-200 border-purple-500'
                        }`}>
                          <Play className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-700'}`} strokeWidth={3} />
                        </div>
                      </div>


                      {/* Card 3 - Worksheet */}
                      <div className={`p-4 rounded-2xl border-2 animate-slide-up shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        darkMode 
                          ? 'bg-gray-800 border-orange-500' 
                          : 'bg-orange-100 border-orange-600 hover:border-orange-700'
                      }`} style={{animationDelay: '0.3s'}}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600 to-red-700 flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={3} />
                          </div>
                          <div>
                            <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-orange-950'}`}>Worksheet</div>
                            <div className={`text-xs font-bold ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>Practice</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-orange-300'}`}></div>
                          <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-orange-300'}`}></div>
                          <div className={`flex-1 h-2 rounded-full bg-gradient-to-r from-orange-600 to-red-700`}></div>
                        </div>
                      </div>
                    </div>


                    {/* Bright Particles */}
                    <div className="absolute top-8 right-6 w-4 h-4 rounded-full animate-pulse shadow-2xl" style={{
                      backgroundColor: darkMode ? 'rgb(34, 197, 94)' : 'rgb(37, 99, 235)',
                      boxShadow: darkMode ? '0 0 20px rgba(34, 197, 94, 1)' : '0 0 20px rgba(37, 99, 235, 1)'
                    }}></div>
                    <div className="absolute bottom-16 right-10 w-4 h-4 rounded-full animate-bounce shadow-2xl" style={{
                      backgroundColor: darkMode ? 'rgb(168, 85, 247)' : 'rgb(147, 51, 234)',
                      boxShadow: darkMode ? '0 0 20px rgba(168, 85, 247, 1)' : '0 0 20px rgba(147, 51, 234, 1)',
                      animationDelay: '0.5s'
                    }}></div>
                    <div className="absolute top-20 right-4 w-4 h-4 rounded-full animate-pulse shadow-2xl" style={{
                      backgroundColor: darkMode ? 'rgb(236, 72, 153)' : 'rgb(220, 38, 38)',
                      boxShadow: darkMode ? '0 0 20px rgba(236, 72, 153, 1)' : '0 0 20px rgba(220, 38, 38, 1)',
                      animationDelay: '1s'
                    }}></div>
                  </div>
                </div>


                {/* Glow Effects - VIBRANT */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full blur-2xl animate-pulse-slow" style={{
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgb(34, 197, 94), rgb(59, 130, 246))'
                    : 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))',
                  opacity: 0.8,
                  boxShadow: darkMode
                    ? '0 0 30px rgba(34, 197, 94, 0.8)'
                    : '0 0 30px rgba(59, 130, 246, 0.8)'
                }}></div>
                <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full blur-2xl animate-pulse-slow" style={{
                  background: darkMode 
                    ? 'linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153))'
                    : 'linear-gradient(135deg, rgb(168, 85, 247), rgb(220, 38, 38))',
                  opacity: 0.8,
                  boxShadow: darkMode
                    ? '0 0 30px rgba(168, 85, 247, 0.8)'
                    : '0 0 30px rgba(168, 85, 247, 0.8)',
                  animationDelay: '1s'
                }}></div>
              </div>


              {/* Floating badges */}
              <div className="absolute top-12 -left-12 animate-float-elegant" style={{animationDelay: '0.5s', animationDuration: '8s'}}>
                <div className={`px-4 py-2 rounded-lg shadow-xl border-2 flex items-center gap-2 font-bold ${
                  darkMode 
                    ? 'bg-gray-800 border-cyan-500' 
                    : 'bg-blue-200 border-blue-600'
                }`}>
                  <Star className="w-5 h-5 text-yellow-500" strokeWidth={3} fill="currentColor" />
                  <span className={`text-sm ${darkMode ? 'text-cyan-300' : 'text-blue-900'}`}>4.9</span>
                </div>
              </div>


              <div className="absolute bottom-24 -right-12 animate-float-elegant" style={{animationDelay: '1s', animationDuration: '10s'}}>
                <div className={`px-4 py-2 rounded-lg shadow-xl border-2 flex items-center gap-2 font-bold ${
                  darkMode 
                    ? 'bg-gray-800 border-purple-500' 
                    : 'bg-purple-200 border-purple-600'
                }`}>
                  <Users className="w-5 h-5" strokeWidth={3} style={{color: darkMode ? 'rgb(168, 85, 247)' : 'rgb(109, 40, 217)'}} />
                  <span className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-900'}`}>10K+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 2: Choose Your Learning Path */}
      <section className={`py-32 px-6 lg:px-8 relative w-full transition-all duration-700 ${
        darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
      }`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Choose Your <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-purple-600'
              }`}>Learning Path</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Join thousands of learners and educators in our community
            </p>
          </div>


          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Student Card */}
            <div className={`group relative p-12 rounded-3xl cursor-pointer transition-all duration-500 hover:scale-105 overflow-hidden ${
              darkMode ? 'bg-slate-800 border border-slate-700 hover:border-cyan-500' : 'bg-white border border-gray-300 hover:border-blue-400 shadow-lg'
            }`} onClick={() => navigate('/login/student')}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <GraduationCap className="w-12 h-12 text-white" strokeWidth={2} />
                </div>


                <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>I'm a Student</h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Start your learning journey with expert guidance and AI-powered assistance
                </p>


                <div className={`inline-flex items-center gap-2 font-semibold text-lg transition-all duration-300 group-hover:gap-4 ${
                  darkMode ? 'text-cyan-400' : 'text-blue-600'
                }`}>
                  Start Learning 
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>
            </div>


            {/* Teacher Card */}
            <div className={`group relative p-12 rounded-3xl cursor-pointer transition-all duration-500 hover:scale-105 overflow-hidden ${
              darkMode ? 'bg-slate-800 border border-slate-700 hover:border-purple-500' : 'bg-white border border-gray-300 hover:border-purple-400 shadow-lg'
            }`} onClick={() => navigate('/login/teacher')}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-12 h-12 text-white" strokeWidth={2} />
                </div>


                <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-600'}`}>I'm a Teacher</h3>
                <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                  Share your expertise and inspire the next generation of learners
                </p>


                <div className={`inline-flex items-center gap-2 font-semibold text-lg transition-all duration-300 group-hover:gap-4 ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  Start Teaching 
                  <ArrowRight className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Section 3: Features */}
      <section id="features" className={`py-32 px-6 lg:px-8 relative w-full transition-all duration-700 ${
        darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <span className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>Helping Students Learn &</span>{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-purple-600'
              }`}>Teachers Teach Smarter</span>
            </h2>
            <p className={`text-xl ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              AI tools that simplify studying for learners and save time for educators.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`group p-10 rounded-3xl transition-all duration-500 hover:scale-105 text-center ${
                  darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-300 shadow-lg'
                }`}>
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl shadow-lg mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                  <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community and experience the future of education today.
          </p>
          <Button className="h-16 px-12 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-xl hover:scale-105 transition-all duration-300" onClick={() => navigate('/login/student')}>
            Get Started Free
          </Button>
        </div>
      </section>


      <Footer darkMode={darkMode} />
    </div>
  );
};


export default Index;
