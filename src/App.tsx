
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import TeacherDashboard from "./pages/TeacherDashboard";
// import ChatInterface from "./pages/ChatInterface";
import NotFound from "./pages/NotFound";
import ConceptVideo from "@/pages/ConceptVideo";
import ChatQnA from "./pages/ChatQnA"; // or correct path
import WorksheetGenerator from "./pages/WorksheetGenerator";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          {/* <Route path="/chat" element={<ChatInterface />} /> */}
          <Route path="/chat" element={<ChatQnA />} />
          <Route path="/worksheet" element={<WorksheetGenerator />} />

          <Route path="/concept-video" element={<ConceptVideo />} />


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
