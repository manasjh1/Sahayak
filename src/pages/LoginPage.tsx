
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen } from "lucide-react";
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
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '');
    
    // Indian mobile numbers are 10 digits starting with 6,7,8,9
    if (phoneNumber.length <= 10) {
      return phoneNumber;
    }
    
    // If more than 10 digits, keep only first 10
    return phoneNumber.slice(0, 10);
  };

  const validatePhoneNumber = (phone: string) => {
    // Indian mobile number validation: 10 digits starting with 6,7,8,9
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
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSendOTP = async () => {
    if (!contactValue.trim()) return;

    // Validate input based on method
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
      
      // For phone: send just the 10-digit number, method as "sms"
      // For email: send email as is, method as "email"
      const requestData = {
        identifier: contactValue, // No +91 prefix for phone
        method: loginMethod === "phone" ? "sms" : "email", // Use "sms" for phone
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
          method: loginMethod === "phone" ? "sms" : "email", // Pass "sms" for phone
          contact: contactValue, // Pass original contact value
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
        <div className="space-y-8">
          <Button
            onClick={() => setLoginMethod("email")}
            variant="outline"
            className="w-full h-20 text-left justify-start gap-8 clean-card clean-card-hover bw-outline"
          >
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-xl">Login with Email</div>
              <div className="text-lg text-muted-foreground">Use your email address</div>
            </div>
          </Button>

          <Button
            onClick={() => setLoginMethod("phone")}
            variant="outline"
            className="w-full h-20 text-left justify-start gap-8 clean-card clean-card-hover bw-outline"
          >
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <div className="font-medium text-xl">Login with Phone</div>
              <div className="text-lg text-muted-foreground">Use your phone number</div>
            </div>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-10 animate-slide-up">
        <div className="space-y-4">
          <label className="text-lg font-medium text-foreground">
            {loginMethod === "email" ? "Enter your email" : "Enter your phone number"}
          </label>
          <div className="relative">
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
              {loginMethod === "email" ? (
                <Mail className="w-7 h-7 text-muted-foreground" />
              ) : (
                <Phone className="w-7 h-7 text-muted-foreground" />
              )}
            </div>
            <Input
              type={loginMethod === "email" ? "email" : "tel"}
              placeholder={loginMethod === "email" ? "your.email@example.com" : "7428986796"}
              value={contactValue}
              onChange={handleInputChange}
              className="pl-16 h-16 clean-card border-black/20 focus:border-black text-lg"
              autoFocus
              maxLength={loginMethod === "phone" ? 10 : undefined}
            />
          </div>
          {loginMethod === "phone" && (
            <p className="text-sm text-muted-foreground">
              Enter 10-digit mobile number (starting with 6, 7, 8, or 9)
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          onClick={handleSendOTP}
          disabled={!contactValue.trim() || loading}
          className="w-full h-16 bw-accent transition-all duration-300 text-lg font-medium"
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
          className="w-full text-lg text-muted-foreground hover:text-foreground h-12"
        >
          Choose different method
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="clean-card p-12 rounded-3xl animate-fade-in min-h-[650px]">
            {/* Icon & Title */}
            <div className="text-center mb-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-black flex items-center justify-center mb-8">
                <Icon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            </div>

            {/* Login Methods */}
            {renderLoginMethod()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;

