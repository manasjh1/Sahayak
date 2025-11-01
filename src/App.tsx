import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ChildrenDashboard from "./pages/ChildrenDashboard";
import NotFound from "./pages/NotFound";
import ConceptVideo from "@/pages/ConceptVideo";
import ChatQnA from "./pages/ChatQnA";
import WorksheetGenerator from "./pages/WorksheetGenerator";
import LoginPage from "./pages/LoginPage";
import StudentOTPVerification from "./pages/OTPPage";
import About from "./pages/About";


const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/about" element={<About />} />
          
          {/* Authentication Routes */}
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/otp/:role" element={<StudentOTPVerification />} />
          
          {/* Dashboard Routes */}
          <Route path="/student/dashboard" element={<ChildrenDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          
          {/* Feature Routes */}
          <Route path="/pages/ChatQnA" element={<ChatQnA />} />
          <Route path="/chat" element={<ChatQnA />} />
          <Route path="/worksheet" element={<WorksheetGenerator />} />
          <Route path="/concept-video" element={<ConceptVideo />} />
          
          {/* Catch-all route - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;
