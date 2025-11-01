import { useState, KeyboardEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "../components/ui/Footer";


const LoginPage = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<"email" | "phone" | null>(null);
  const [contactValue, setContactValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const isStudent = role === "student";
  const Icon = isStudent ? GraduationCap : BookOpen;
  const title = isStudent ? "Student Login" : "Teacher Login";
  const subtitle = isStudent ? "Continue your learning journey" : "Access your teaching dashboard";


  // Phone number formatting and validation
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    if (phoneNumber.length <= 10) {
      return phoneNumber;
    }
    return phoneNumber.slice(0, 10);
  };


  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };


  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (loginMethod === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setContactValue(formattedPhone);
    } else {
      setContactValue(value);
    }
    
    if (error) setError("");
  };


  // Handle Enter key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && contactValue.trim() && !loading) {
      e.preventDefault();
      handleSendOTP();
    }
  };


  const handleSendOTP = async () => {
    if (!contactValue.trim()) return;


    // Validate input
    if (loginMethod === "email" && !validateEmail(contactValue)) {
      setError("Please enter a valid email address");
      return;
    }
    
    if (loginMethod === "phone" && !validatePhoneNumber(contactValue)) {
      setError("Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9");
      return;
    }


    setLoading(true);
    setError("");


    try {
      console.log('Sending POST request to:', 'https://rag-bot-53xj.onrender.com/auth/send-otp');
      
      const requestData = {
        identifier: contactValue,
        method: loginMethod === "phone" ? "sms" : "email",
      };
      
      console.log('Request body:', requestData);


      const response = await fetch('https://rag-bot-53xj.onrender.com/auth/send-otp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });


      console.log('Response status:', response.status);


      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || errorData.detail || `HTTP Error: ${response.status}`);
        setLoading(false);
        return;
      }


      const responseData = await response.json();
      console.log('Response data:', responseData);


      // Success - navigate to OTP page
      navigate(`/otp/${role}`, {
        state: {
          method: loginMethod === "phone" ? "sms" : "email",
          contact: contactValue,
        },
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setError("Network error: Could not send OTP. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };


  const renderLoginMethod = () => {
    if (!loginMethod) {
      return (
        <div className="space-y-6">
          {/* Email Login - With Maintenance Warning */}
          <div className="relative">
            <Button
              onClick={() => setLoginMethod("email")}
              variant="outline"
              className="w-full h-20 text-left justify-start gap-6 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl transition-all duration-300 group relative"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div className="text-left">
                <div className="font-semibold text-lg text-white">Login with Email</div>
                <div className="text-sm text-slate-400">Use your email address</div>
              </div>
            </Button>
            {/* Badge - Email Not Working */}
            <div className="absolute top-2 right-3 px-2 py-1 bg-red-500/20 border border-red-500/50 rounded-full flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
              <span className="text-xs font-semibold text-red-300">Not Working</span>
            </div>
          </div>


          {/* Phone Login - Working */}
          <Button
            onClick={() => setLoginMethod("phone")}
            variant="outline"
            className="w-full h-20 text-left justify-start gap-6 bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 rounded-xl transition-all duration-300 group"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="font-semibold text-lg text-white">Login with Phone</div>
              <div className="text-sm text-slate-400">Use your phone number</div>
            </div>
          </Button>

          {/* Info Message */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl flex gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div className="text-sm text-blue-300">
              Email verification is currently under maintenance. Please use phone number for login.
            </div>
          </div>
        </div>
      );
    }


    return (
      <div className="space-y-6 animate-slide-up">
        <div className="space-y-3">
          <label className="text-base font-medium text-slate-300">
            {loginMethod === "email" ? "Enter your email" : "Enter your phone number"}
          </label>
          <Input
            type={loginMethod === "email" ? "email" : "tel"}
            placeholder={loginMethod === "email" ? "your.email@example.com" : "Enter 10-digit mobile number"}
            value={contactValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="h-14 bg-slate-800/40 border-2 border-cyan-500/50 focus:border-cyan-400 text-white placeholder:text-slate-500 rounded-xl text-base px-4"
            autoFocus
            maxLength={loginMethod === "phone" ? 10 : undefined}
          />
          {loginMethod === "phone" && (
            <p className="text-sm text-slate-500">
              Enter 10-digit mobile number (starting with 6, 7, 8, or 9)
            </p>
          )}

          {/* Email Warning Message */}
          {loginMethod === "email" && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
              <div className="text-xs text-red-300">
                Email verification is currently not working. We apologize for the inconvenience. Try using phone number instead.
              </div>
            </div>
          )}
        </div>


        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}


        <Button
          onClick={handleSendOTP}
          disabled={!contactValue.trim() || loading}
          className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>


        <Button
          onClick={() => {
            setLoginMethod(null);
            setError("");
            setContactValue("");
          }}
          variant="ghost"
          className="w-full text-base text-slate-400 hover:text-cyan-400 h-12 rounded-xl"
        >
          Choose different method
        </Button>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>


      {/* Back Button */}
      <div className="relative z-10 px-6 pt-6">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2} />
          Back to Home
        </Button>
      </div>


      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 p-10 rounded-3xl shadow-2xl animate-fade-in">
            {/* Icon & Title */}
            <div className="text-center mb-10">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25">
                <Icon className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-400">{subtitle}</p>
            </div>


            {/* Login Methods */}
            {renderLoginMethod()}
          </div>
        </div>
      </main>


      <Footer darkMode={true} />
    </div>
  );
};


export default LoginPage;
