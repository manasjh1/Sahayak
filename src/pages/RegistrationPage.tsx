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
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../components/ui/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "500+", label: "Teachers Assisted" },
    { number: "50+", label: "Subject Covered" },
    { number: "4.9", label: "User Satisfaction" }
  ];

  const features = [
    {
      icon: Users,
      title: "Instant Doubt Solver",  
      description: "Get answers to any academic question instantly with AI-powered explanations"
    },
    {
      icon: Star,
      title: "Quality Content",
      description: "Curated courses designed for effective learning"  
    },
    {
      icon: Play,
      title: "Interactive Learning",
      description: "Engaging multimedia content and practical exercises - Generate concept videos for any topic instantly",
      featured: true
    }
  ];

  const benefits = [
    { icon: CheckCircle2, text: "24/7 AI-Powered Support" },
    { icon: Zap, text: "Instant Video Generation" },
    { icon: Target, text: "Personalized Learning Paths" },
    { icon: Award, text: "Expert-Curated Content" }
  ];

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header/Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Sahayak</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => navigate('/login/student')}
              >
                Sign In
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                onClick={() => navigate('/login/student')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-800">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-slate-800"
                  onClick={() => navigate('/login/student')}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                  onClick={() => navigate('/login/student')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Video Background */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/education-background.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-people-studying-in-a-library-4908-large.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/85 to-slate-950/95"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-slate-950/70"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">BEST LEARNING PLATFORM</span>
            </div>

            {/* Main Headline - Reduced Size */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl mx-auto">
              Got a Doubt?{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                Just Ask Sahayak.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Your AI buddy that explains tough concepts, makes worksheets, 
              and even plans lessons — just like your smartest study partner.
            </p>

            {/* Benefits List */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-2 px-4 py-2 backdrop-blur-sm bg-slate-800/40 border border-slate-700/50 rounded-full text-slate-300 animate-slide-up hover:bg-slate-800/60 hover:border-cyan-500/30 transition-all duration-300"
                    style={{animationDelay: `${index * 100 + 300}ms`}}
                  >
                    <Icon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Button - Removed subtitle */}
            <div className="pt-6">
              <Button 
                className="h-16 px-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/login/student')}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="animate-slide-up backdrop-blur-sm bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/60 transition-all duration-300 group"
                  style={{animationDelay: `${index * 100 + 600}ms`}}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-400 mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Role Selection Section */}
      <section className="py-32 px-4 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="space-y-6 mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of learners and educators in our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Student Card */}
            <div 
              className="group relative backdrop-blur-xl bg-slate-800/40 p-12 rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 cursor-pointer transition-all duration-500 hover:scale-105 animate-slide-up overflow-hidden"
              onClick={() => navigate('/login/student')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-110">
                  <GraduationCap className="w-12 h-12 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">I'm a Student</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Start your learning journey with expert guidance and AI-powered assistance
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-lg group-hover:gap-4 transition-all duration-300">
                  Start Learning 
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Teacher Card */}
            <div 
              className="group relative backdrop-blur-xl bg-slate-800/40 p-12 rounded-3xl border border-slate-700/50 hover:border-purple-500/50 cursor-pointer transition-all duration-500 hover:scale-105 animate-slide-up delay-200 overflow-hidden"
              onClick={() => navigate('/login/teacher')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:scale-110">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl font-bold text-white">I'm a Teacher</h3>
                  <p className="text-lg text-slate-300 leading-relaxed">
                    Share your expertise and inspire the next generation of learners
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-purple-400 font-semibold text-lg group-hover:gap-4 transition-all duration-300">
                  Start Teaching 
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white">
              Helping Students Learn & Teachers Teach{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Smarter
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              AI tools that simplify studying for learners and save time for educators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group relative backdrop-blur-xl bg-slate-800/40 p-10 rounded-3xl border transition-all duration-500 hover:scale-105 animate-slide-up ${
                    feature.featured 
                      ? 'border-cyan-500/50 hover:border-cyan-400' 
                      : 'border-slate-700/50 hover:border-slate-600'
                  }`}
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  {feature.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-xs font-semibold text-white shadow-lg animate-pulse">
                      MAIN FEATURE
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>

                  <div className="relative z-10 space-y-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/25 group-hover:shadow-xl group-hover:shadow-cyan-500/40 transition-all duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                      <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
