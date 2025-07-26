
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageCircle, 
  Upload, 
  Palette, 
  Mic, 
  Calendar, 
  Gamepad2, 
  BookOpen,
  GraduationCap,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UserData {
  role: string;
  name: string;
  email: string;
  useCase: string;
  gradeLevel: string | null;
}

const TeacherDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  // const [gradeMode, setGradeMode] = useState<string>("General");
  const [gradeMode, setGradeMode] = useState<string>("Grade 7");
  const { toast } = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedData = localStorage.getItem('userData');
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setUserData(parsedData);
  //     setGradeMode(parsedData.useCase === "General Purpose" ? "General" : parsedData.useCase);
  //   }
  // }, []);

  useEffect(() => {
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    setUserData(parsedData);

    // Set grade level if available, otherwise fallback to "Grade 7"
    setGradeMode(parsedData.gradeLevel || "Grade 7");
  } else {
    // If no userData found, default to Grade 7
    setGradeMode("Grade 7");
  }
}, []);

  const gradeModes = [
    
    "Grade 7",
  ];

  const features = [
    {
      id: 1,
      title: "Ask a Question",
      description: "Get instant help with any academic question",
      icon: MessageCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      action: () => navigate("/chat")
    },
    {
      id: 2,
      title: "Generate Worksheets",
      description: "Digitize and analyze educational materials",
      icon: Upload,
      color: "text-green-500",
      bgColor: "bg-green-50",
      action: () => navigate("/worksheet")
    },
    {
      id: 3,
      title: "Generate Visual Aids",
      description: "Create drawings and diagrams for better understanding",
      icon: Palette,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      action: () => navigate("/chat")
    },
    {
      id: 5,
      title: "Weekly Lesson Planner",
      description: "Plan and organize your weekly curriculum",
      icon: Calendar,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      action: () => navigate("/chat")
    },
    {
  id: 6,
  title: "Concept Visualizer",
  description: "Enter a topic to get video-based explanations",
  icon: BookOpen, // You can change to another icon like 'PlayCircle' or 'Video'
  color: "text-pink-500",
  bgColor: "bg-pink-50",
  action: () => navigate("/concept-video")
}

    // {
    //   id: 6,
    //   title: "Educational Game Generator",
    //   description: "Create engaging games for your students",
    //   icon: Gamepad2,
    //   color: "text-pink-500",
    //   bgColor: "bg-pink-50",
    //   action: () => navigate("/chat")
    // },
    // {
    //   id: 7,
    //   title: "Try Cow",
    //   description: "Experimental feature - coming soon!",
    //   icon: BookOpen,
    //   color: "text-gray-500",
    //   bgColor: "bg-gray-50",
    //   action: () => toast({
    //     title: "Coming Soon",
    //     description: "This feature is under development!",
    //   })
    // }
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    if (feature.action) {
      feature.action();
    } else {
      toast({
        title: `${feature.title} Selected`,
        description: `You clicked on: ${feature.description}`,
      });
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Loading...</h1>
          <p className="text-muted-foreground">Please wait while we load your dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Sahayak</h1>
                <p className="text-sm text-muted-foreground">Education Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{userData.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Greeting and Grade Mode */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Hello, {userData.name}! 👋
          </h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-lg font-medium text-foreground">Grade Mode:</span>
            <Select value={gradeMode} onValueChange={setGradeMode}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {gradeModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>
                    {mode}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Features Grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.id} 
              className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleFeatureClick(feature)}
            >
              <CardHeader className="pb-3">
                <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {(userData.role === "Student"
    ? features.filter(f => f.title === "Ask a Question" || f.title === "Generate Worksheets")
    : features
  ).map((feature, index) => (
    <Card 
      key={feature.id}
      className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => handleFeatureClick(feature)}
    >
      <CardHeader className="pb-3">
        <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
          <feature.icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-lg font-semibold text-foreground">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  ))}
</div>


        {/* Quick Actions */}
        {/* <div className="mt-12 animate-fade-in">
          <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => navigate("/chat")}
            >
              <MessageCircle className="h-6 w-6" />
              <span>New Question</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => navigate("/chat")}
            >
              <Upload className="h-6 w-6" />
              <span>Upload File</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => navigate("/chat")}
            >
              <Calendar className="h-6 w-6" />
              <span>Plan Lesson</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col space-y-2"
              onClick={() => navigate("/chat")}
            >
              <Gamepad2 className="h-6 w-6" />
              <span>Create Game</span>
            </Button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TeacherDashboard;
