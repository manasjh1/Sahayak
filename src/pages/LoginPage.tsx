

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

  const isStudent = role === "student";
  const Icon = isStudent ? GraduationCap : BookOpen;
  const title = isStudent ? "Student Login" : "Teacher Login";
  const subtitle = isStudent ? "Continue your learning journey" : "Access your teaching dashboard";

  const handleSendOTP = () => {
    if (contactValue.trim()) {
      navigate(`/otp/${role}`, { 
        state: { 
          method: loginMethod, 
          contact: contactValue 
        }
      });
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
              placeholder={loginMethod === "email" ? "your.email@example.com" : "+1 (555) 123-4567"}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="pl-16 h-16 clean-card border-black/20 focus:border-black text-lg"
              autoFocus
            />
          </div>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={!contactValue.trim()}
          className="w-full h-16 bw-accent transition-all duration-300 text-lg font-medium"
        >
          Send OTP
        </Button>

        <Button
          onClick={() => setLoginMethod(null)}
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

































// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Mail, Phone, GraduationCap, BookOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Footer from "../components/ui/Footer";

// const LoginPage = () => {
//   const { role } = useParams<{ role: string }>();
//   const navigate = useNavigate();
//   const [loginMethod, setLoginMethod] = useState<"email" | "phone" | null>(null);
//   const [contactValue, setContactValue] = useState("");

//   const isStudent = role === "student";
//   const Icon = isStudent ? GraduationCap : BookOpen;
//   const title = isStudent ? "Student Login" : "Teacher Login";
//   const subtitle = isStudent ? "Continue your learning journey" : "Access your teaching dashboard";

//   const handleSendOTP = () => {
//     if (contactValue.trim()) {
//       navigate(`/otp/${role}`, { 
//         state: { 
//           method: loginMethod, 
//           contact: contactValue 
//         }
//       });
//     }
//   };

//   const renderLoginMethod = () => {
//     if (!loginMethod) {
//       return (
//         <div className="space-y-4">
//           <Button
//             onClick={() => setLoginMethod("email")}
//             variant="outline"
//             className="w-full h-14 text-left justify-start gap-4 clean-card clean-card-hover bw-outline"
//           >
//             <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
//               <Mail className="w-5 h-5 text-white" />
//             </div>
//             <div className="text-left">
//               <div className="font-medium">Login with Email</div>
//               <div className="text-sm text-muted-foreground">Use your email address</div>
//             </div>
//           </Button>

//           <Button
//             onClick={() => setLoginMethod("phone")}
//             variant="outline"
//             className="w-full h-14 text-left justify-start gap-4 clean-card clean-card-hover bw-outline"
//           >
//             <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
//               <Phone className="w-5 h-5 text-white" />
//             </div>
//             <div className="text-left">
//               <div className="font-medium">Login with Phone</div>
//               <div className="text-sm text-muted-foreground">Use your phone number</div>
//             </div>
//           </Button>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6 animate-slide-up">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">
//             {loginMethod === "email" ? "Enter your email" : "Enter your phone number"}
//           </label>
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               {loginMethod === "email" ? (
//                 <Mail className="w-5 h-5 text-muted-foreground" />
//               ) : (
//                 <Phone className="w-5 h-5 text-muted-foreground" />
//               )}
//             </div>
//             <Input
//               type={loginMethod === "email" ? "email" : "tel"}
//               placeholder={loginMethod === "email" ? "your.email@example.com" : "+1 (555) 123-4567"}
//               value={contactValue}
//               onChange={(e) => setContactValue(e.target.value)}
//               className="pl-12 h-12 clean-card border-black/20 focus:border-black"
//               autoFocus
//             />
//           </div>
//         </div>

//         <Button
//           onClick={handleSendOTP}
//           disabled={!contactValue.trim()}
//           className="w-full h-12 bw-accent transition-all duration-300"
//         >
//           Send OTP
//         </Button>

//         <Button
//           onClick={() => setLoginMethod(null)}
//           variant="ghost"
//           className="w-full text-muted-foreground hover:text-foreground"
//         >
//           Choose different method
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       {/* Header */}
//       <header className="py-6 px-4">
//         <div className="max-w-md mx-auto flex items-center gap-4">
//           <Button
//             onClick={() => navigate("/")}
//             variant="ghost"
//             size="sm"
//             className="hover:bg-secondary"
//           >
//             <ArrowLeft className="w-4 h-4" />
//           </Button>
//           <h1 className="text-xl font-semibold text-white">Sahayak</h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex items-center justify-center px-4 py-8">
//         <div className="w-full max-w-md">
//           <div className="clean-card p-8 rounded-2xl animate-fade-in">
//             {/* Icon & Title */}
//             <div className="text-center mb-8">
//               <div className="mx-auto w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
//                 <Icon className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold mb-2">{title}</h2>
//               <p className="text-muted-foreground text-sm">{subtitle}</p>
//             </div>

//             {/* Login Methods */}
//             {renderLoginMethod()}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default LoginPage;