import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft,
  Brain,
  Database,
  Video,
  Sparkles,
  Layers,
  Search,
  FileText,
  Zap,
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  Users,
  Star,
  CheckCircle2,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../components/ui/Footer";


const About = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  const technologies = [
    {
      icon: Brain,
      title: "Large Language Models (LLMs)",
      description: "Sahayak leverages advanced Large Language Models trained on vast amounts of text data. These models understand context, generate human-like responses, and can explain complex concepts in simple terms. They power our instant doubt-solving feature and provide personalized learning experiences tailored to each student's needs.",
      gradient: "from-cyan-500 to-blue-600",
      features: ["Natural Language Understanding", "Context-Aware Responses", "Multi-Domain Knowledge", "Personalized Explanations"]
    },
    {
      icon: Video,
      title: "Video Large Language Models (Video LLMs)",
      description: "Our platform uses cutting-edge Video Large Language Models that can understand and analyze video content in real-time. This technology enables us to create interactive video lessons, generate automated summaries, and provide timestamp-based explanations for educational videos. Students can ask questions about video content and get instant answers.",
      gradient: "from-purple-500 to-pink-600",
      features: ["Video Content Analysis", "Automated Captioning", "Visual Question Answering", "Scene Understanding", "Time-Stamped Explanations"]
    },
    {
      icon: Database,
      title: "RAG (Retrieval-Augmented Generation)",
      description: "We implement RAG technology to enhance our AI's accuracy by combining real-time information retrieval with generative AI. This ensures responses are factual, up-to-date, and grounded in authoritative educational sources from our curated knowledge base. RAG reduces hallucinations and provides cited sources for every answer.",
      gradient: "from-orange-500 to-red-600",
      features: ["Real-Time Knowledge Access", "Source Attribution", "Reduced Hallucinations", "Domain-Specific Accuracy", "Verified Information"]
    },
    {
      icon: Layers,
      title: "Neural Network Architecture",
      description: "Our system is built on transformer-based neural networks with advanced attention mechanisms. These architectures enable the model to process sequential data efficiently, understand long-range dependencies, maintain context across extended conversations, and provide coherent multi-turn interactions.",
      gradient: "from-green-500 to-emerald-600",
      features: ["Attention Mechanisms", "Transfer Learning", "Fine-Tuned Models", "Efficient Processing", "Multi-Head Attention"]
    }
  ];


  const ragSteps = [
    {
      icon: Search,
      title: "1. Retrieve Information",
      description: "When you ask a question, our system searches through curated educational databases, verified textbooks, and authoritative sources to find the most relevant information."
    },
    {
      icon: Brain,
      title: "2. Augment with Context",
      description: "The retrieved information is combined with your question and fed to our LLM, providing it with accurate, up-to-date context and reducing the chance of incorrect responses."
    },
    {
      icon: FileText,
      title: "3. Generate Response",
      description: "Our LLM generates a comprehensive, accurate answer based on both its training and the retrieved information, with proper source citations and explanations."
    }
  ];


  const capabilities = [
    {
      icon: Sparkles,
      title: "Instant Doubt Solving",
      description: "Get answers to any academic question in seconds with AI-powered explanations"
    },
    {
      icon: Video,
      title: "Video Analysis",
      description: "Upload or link videos and get automatic summaries, transcripts, and Q&A"
    },
    {
      icon: FileText,
      title: "Content Generation",
      description: "Generate worksheets, practice problems, and study materials automatically"
    },
    {
      icon: BookOpen,
      title: "Study Materials",
      description: "Access curated study guides, notes, and learning resources"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Learn with peers through AI-powered group study sessions"
    },
    {
      icon: Zap,
      title: "Real-Time Assistance",
      description: "Get instant help while solving problems or working on assignments"
    }
  ];

  const uniqueFeatures = [
    {
      icon: Award,
      title: "Grade-Specific Learning",
      description: "Unlike generic AI tutors, Sahayak understands your grade level and curriculum. A 5th grader gets explanations suited to their cognitive level, while a 12th grader receives advanced concepts. Our AI adapts content difficulty, vocabulary complexity, and explanation depth based on your grade.",
      gradient: "from-blue-500 to-cyan-600",
      examples: ["5th Grade: Simple analogies and visual explanations", "8th Grade: Problem-solving techniques with step-by-step guidance", "12th Grade: Advanced concepts with mathematical proofs"]
    },
    {
      icon: BookOpen,
      title: "Curriculum-Aligned Responses",
      description: "Sahayak is trained on various curriculum standards (CBSE, ICSE, State Boards, IB, etc.). Get answers that match your specific textbook and curriculum requirements, ensuring you learn exactly what you need to study.",
      gradient: "from-purple-500 to-pink-600",
      examples: ["Know your curriculum board and topics", "Get targeted practice materials", "Prepare for your specific exams"]
    },
    {
      icon: Brain,
      title: "Age-Appropriate Pedagogy",
      description: "Our AI uses teaching methods scientifically proven for each age group. Younger students get visual and interactive content, while older students receive more abstract and analytical approaches.",
      gradient: "from-orange-500 to-red-600",
      examples: ["Younger students: Stories & Visuals", "Teens: Logic & Critical Thinking", "Advanced: Research-based learning"]
    }
  ];


  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ];


  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
    } else if (href.includes('#')) {
      navigate(href.split('#')[0]);
      setTimeout(() => {
        const id = href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
                aria-label="Toggle dark mode"
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden transition-all duration-700 ${darkMode ? 'text-white' : 'text-gray-900'}`}
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
              <div className="pt-4 space-y-3 border-t" style={{borderColor: darkMode ? 'rgb(51, 65, 85)' : 'rgb(229, 231, 235)'}}>
                <button 
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className={`w-full p-3 rounded-lg transition-all duration-700 flex items-center justify-center gap-2 font-medium ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                  }`}
                >
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


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
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


        <div className="w-full max-w-[1400px] mx-auto relative z-10">
          <Button
            variant="ghost"
            className={`mb-8 transition-all duration-300 ${darkMode ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Button>


          <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${
              darkMode ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20' : 'bg-white/50 border-blue-400/40'
            }`}>
              <Sparkles className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} strokeWidth={2} />
              <span className={`text-sm font-semibold tracking-wide ${darkMode ? 'text-cyan-300' : 'text-blue-700'}`}>POWERED BY AI</span>
            </div>


            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              The Technology Behind{" "}
              <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode ? 'from-cyan-400 via-blue-500 to-purple-500' : 'from-blue-600 via-purple-600 to-pink-600'
              }`}>
                Sahayak
              </span>
            </h1>


            <p className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              We leverage cutting-edge AI technologies including Large Language Models, Video Understanding, and Retrieval-Augmented Generation to create the most advanced learning platform for students and teachers worldwide.
            </p>
          </div>
        </div>
      </section>


      {/* Technologies Section */}
      <section className={`py-20 px-6 lg:px-8 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="w-full max-w-[1400px] mx-auto space-y-16">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div key={index} className={`p-8 md:p-12 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${
                darkMode ? 'bg-slate-800 border-slate-700 hover:border-cyan-500' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200 shadow-lg hover:shadow-xl'
              }`}>
                <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center shadow-xl flex-shrink-0`}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>


                  <div className="space-y-6">
                    <div>
                      <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {tech.title}
                      </h2>
                      <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        {tech.description}
                      </p>
                    </div>


                    <div className="grid sm:grid-cols-2 gap-3">
                      {tech.features.map((feature, idx) => (
                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                          darkMode ? 'bg-slate-900/50 hover:bg-slate-700' : 'bg-blue-50 hover:bg-blue-100'
                        }`}>
                          <Zap className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} strokeWidth={2} />
                          <span className={`text-sm font-medium ${darkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* UNIQUE FEATURES: Grade-Specific Learning Section */}
      <section className={`py-20 px-6 lg:px-8 ${darkMode ? 'bg-slate-950' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-4 ${
              darkMode ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20' : 'bg-yellow-100/50 border-yellow-400/40'
            }`}>
              <Star className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} strokeWidth={2} fill="currentColor" />
              <span className={`text-sm font-semibold tracking-wide ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>UNIQUE FEATURES</span>
            </div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What Makes Sahayak <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode ? 'from-yellow-400 to-orange-500' : 'from-yellow-600 to-orange-600'
              }`}>Different</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Grade-specific learning that ChatGPT can't provide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-slate-800 border-slate-700 hover:border-yellow-500' : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
                }`}>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-base leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                  
                  <div className={`border-t pt-4 ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
                    <p className={`text-xs font-semibold mb-3 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Examples:</p>
                    <ul className="space-y-2">
                      {feature.examples.map((example, idx) => (
                        <li key={idx} className={`text-sm flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                          <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${
                            darkMode ? 'bg-yellow-400' : 'bg-yellow-600'
                          }`}></span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`p-8 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-lg'}`}>
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Why Grade-Specific Learning Matters</h3>
            <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'} text-base leading-relaxed`}>
              ChatGPT provides one-size-fits-all answers that might be too advanced for a 5th grader or too simple for a 12th grader. Sahayak understands developmental psychology and curriculum standards, ensuring every student gets the perfect level of explanation. We tailor the complexity, examples, language, and teaching methodology to match your grade level and learning objectives. This makes learning faster, more effective, and actually fun!
            </p>
          </div>
        </div>
      </section>


      {/* How RAG Works Section */}
      <section className={`py-20 px-6 lg:px-8 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              How <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
                darkMode ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-purple-600'
              }`}>RAG</span> Powers Our Platform
            </h2>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Retrieval-Augmented Generation combines real-time information with AI intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ragSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className={`relative p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-slate-800 border border-slate-700 hover:border-cyan-500' : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl'
                }`}>
                  <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-full text-white font-bold flex items-center justify-center text-lg ${
                    index === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' : 
                    index === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 
                    'bg-gradient-to-br from-orange-500 to-red-600'
                  }`}>
                    {index + 1}
                  </div>
                  
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
                    index === 0 ? 'from-blue-500 to-cyan-600' : 
                    index === 1 ? 'from-purple-500 to-pink-600' : 
                    'from-orange-500 to-red-600'
                  } flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {step.title}
                  </h3>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Capabilities Section */}
      <section className={`py-20 px-6 lg:px-8 ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              What Sahayak Can Do For You
            </h2>
            <p className={`text-lg ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Comprehensive AI-powered learning features
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className={`p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'bg-slate-800 border border-slate-700 hover:border-cyan-500' : 'bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-lg hover:shadow-xl'
                }`}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                    index % 3 === 0 ? 'from-cyan-500 to-blue-600' :
                    index % 3 === 1 ? 'from-purple-500 to-pink-600' :
                    'from-orange-500 to-red-600'
                  } flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {capability.title}
                  </h3>
                  <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className={`py-20 px-6 lg:px-8 ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="w-full max-w-[1400px] mx-auto">
          <h2 className={`text-3xl md:text-5xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Why Choose <span className={`bg-gradient-to-r bg-clip-text text-transparent ${
              darkMode ? 'from-cyan-400 to-purple-500' : 'from-blue-600 to-purple-600'
            }`}>Sahayak</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`p-10 rounded-2xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <Star className={`w-8 h-8 mb-4 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} strokeWidth={2} fill="currentColor" />
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Accurate & Verified</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Using RAG technology, every answer is grounded in verified sources and academic databases, reducing hallucinations and providing citations.
              </p>
            </div>

            <div className={`p-10 rounded-2xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <Zap className={`w-8 h-8 mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} strokeWidth={2} />
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Instant Responses</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Get answers to your questions in seconds, 24/7, without waiting for a teacher or tutor to be available.
              </p>
            </div>

            <div className={`p-10 rounded-2xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <Brain className={`w-8 h-8 mb-4 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} strokeWidth={2} />
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Personalized Learning</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                Sahayak adapts to your learning style and pace, providing customized explanations and study materials.
              </p>
            </div>

            <div className={`p-10 rounded-2xl ${darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-lg'}`}>
              <CheckCircle2 className={`w-8 h-8 mb-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} strokeWidth={2} />
              <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Comprehensive Coverage</h3>
              <p className={`${darkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                From Mathematics to Science, Languages to Social Studies - Sahayak covers all major subjects and topics.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,transparent_0%,rgb(0,0,0)_100%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Experience the Future of Learning Today
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of students and teachers using AI-powered education tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="h-14 px-8 text-base font-semibold bg-white text-blue-600 hover:bg-gray-100 rounded-xl shadow-xl hover:scale-105 transition-all duration-300" 
              onClick={() => navigate('/login/student')}
            >
              Get Started Free
            </Button>
            <Button 
              variant="outline"
              className="h-14 px-8 text-base font-semibold text-white border-2 border-white hover:bg-white/10 rounded-xl transition-all duration-300" 
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
};


export default About;
