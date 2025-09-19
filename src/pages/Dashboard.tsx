import { useParams } from "react-router-dom";
import { GraduationCap, BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { role } = useParams<{ role: string }>();
  
  const isStudent = role === "student";
  const Icon = isStudent ? GraduationCap : BookOpen;
  const title = isStudent ? "Student Dashboard" : "Teacher Dashboard";
  const welcomeMessage = isStudent 
    ? "Welcome to your learning space!" 
    : "Welcome to your teaching hub!";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-black">Sahayak</h1>
              <p className="text-sm text-muted-foreground capitalize">{role} Portal</p>
            </div>
          </div>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{welcomeMessage}</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {/* Placeholder cards for the dashboard */}
          <div className="clean-card clean-card-hover p-6 rounded-xl">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-semibold text-lg">📚</span>
              </div>
              <h3 className="font-semibold">
                {isStudent ? "My Courses" : "Manage Courses"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isStudent ? "Access your enrolled courses" : "Create and manage your courses"}
              </p>
            </div>
          </div>

          <div className="clean-card clean-card-hover p-6 rounded-xl">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-semibold text-lg">📊</span>
              </div>
              <h3 className="font-semibold">
                {isStudent ? "Progress" : "Analytics"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isStudent ? "Track your learning progress" : "View student performance"}
              </p>
            </div>
          </div>

          <div className="clean-card clean-card-hover p-6 rounded-xl">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-black flex items-center justify-center">
                <span className="text-white font-semibold text-lg">💬</span>
              </div>
              <h3 className="font-semibold">
                {isStudent ? "AI Assistant" : "Student Support"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isStudent ? "Get help from AI tutor" : "Support your students"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;