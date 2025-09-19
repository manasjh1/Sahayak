import { MessageCircle, FileText, Image, Calendar, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const ChildrenDashboard = () => {
  const features = [
    {
      title: "Ask a Question",
      description: "Get instant help with any academic question",
      icon: MessageCircle,
      buttonText: "Ask...",
    },
    {
      title: "Generate Worksheets",
      description: "Digitize and analyse educational materials",
      icon: FileText,
      buttonText: "Generate...",
    },
    
    {
      title: "Weekly Lesson Planner",
      description: "Plan and organize your weekly curriculum",
      icon: Calendar,
      buttonText: "Plan...",
    },
    
    {
      title: "Concept Visualizer",
      description: "Enter a topic to get video-based exploration",
      icon: Eye,
      buttonText: "Generate...",
    },
  ];

  return (
    <div className="h-screen bg-gradient-dashboard relative overflow-hidden">
      {/* Main Content */}
      <main className="px-6 py-8 h-full">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Welcome Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Hello, Student !
              </h2>
              <div className="flex items-center gap-3 text-white/70">
                <span>Grade Mode:</span>
                <Select defaultValue="grade7">
                  <SelectTrigger className="w-36 bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade1">Grade 1</SelectItem>
                    <SelectItem value="grade2">Grade 2</SelectItem>
                    <SelectItem value="grade3">Grade 3</SelectItem>
                    <SelectItem value="grade4">Grade 4</SelectItem>
                    <SelectItem value="grade5">Grade 5</SelectItem>
                    <SelectItem value="grade6">Grade 6</SelectItem>
                    <SelectItem value="grade7">Grade 7</SelectItem>
                    <SelectItem value="grade8">Grade 8</SelectItem>
                    <SelectItem value="grade9">Grade 9</SelectItem>
                    <SelectItem value="grade10">Grade 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 flex-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-card backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group h-72"
                >
                  <CardContent className="p-8">
                    <div className="flex flex-col items-start gap-4">
                      <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                          {feature.description}
                        </p>
                      </div>
                      
                      <Button 
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
                        onClick={() => window.location.href = '/pages/ChatQna'}
                      >
                        
                        {feature.buttonText}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChildrenDashboard