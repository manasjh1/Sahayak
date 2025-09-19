import { MessageCircle, FileText, Image, Calendar, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const TeacherDashboard = () => {
  const navigate = useNavigate();

  // Get user info from localStorage
  const userContact = localStorage.getItem('userContact') || 'Teacher';

  const features = [
    {
      title: "Ask a Question",
      description: "Get instant help with any academic question",
      icon: MessageCircle,
      buttonText: "Ask...",
      path: "/pages/ChatQnA"
    },
    {
      title: "Generate Worksheets",
      description: "Digitize and analyse educational materials",
      icon: FileText,
      buttonText: "Generate...",
      path: "/worksheet"
    },
    {
      title: "Generate Visual Aids",
      description: "Create drawings and diagrams for better understanding",
      icon: Image,
      buttonText: "Generate...",
      path: "/pages/ChatQnA" // Update with actual path
    },
    {
      title: "Weekly Lesson Planner",
      description: "Plan and organize your weekly curriculum",
      icon: Calendar,
      buttonText: "Plan...",
      path: "/pages/ChatQnA" // Update with actual path
    },
    {
      title: "Concept Visualizer",
      description: "Enter a topic to get video-based exploration",
      icon: Eye,
      buttonText: "Generate...",
      path: "/concept-video"
    },
  ];

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userContact');
    navigate('/');
  };

  return (
    <div className="h-screen bg-gradient-dashboard relative overflow-hidden">
      {/* Main Content */}
      <main className="px-6 py-8 h-full">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Welcome Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between">
              <h2 className="text-5xl font-bold text-white leading-tight">
                Hello, Teacher !
              </h2>
              <div className="flex items-center gap-6">
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
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="text-white border-white/20 hover:bg-white/10"
                >
                  Logout
                </Button>
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
                        onClick={() => handleFeatureClick(feature.path)}
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

export default TeacherDashboard;



// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   MessageCircle, 
//   Upload, 
//   Palette, 
//   Mic, 
//   Calendar, 
//   Gamepad2, 
//   BookOpen,
//   GraduationCap,
//   User
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";

// interface UserData {
//   role: string;
//   name: string;
//   email: string;
//   useCase: string;
//   gradeLevel: string | null;
// }

// const TeacherDashboard = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   // const [gradeMode, setGradeMode] = useState<string>("General");
//   const [gradeMode, setGradeMode] = useState<string>("Grade 7");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const storedData = localStorage.getItem('userData');
//   //   if (storedData) {
//   //     const parsedData = JSON.parse(storedData);
//   //     setUserData(parsedData);
//   //     setGradeMode(parsedData.useCase === "General Purpose" ? "General" : parsedData.useCase);
//   //   }
//   // }, []);

//   useEffect(() => {
//   const storedData = localStorage.getItem('userData');
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     setUserData(parsedData);

//     // Set grade level if available, otherwise fallback to "Grade 7"
//     setGradeMode(parsedData.gradeLevel || "Grade 7");
//   } else {
//     // If no userData found, default to Grade 7
//     setGradeMode("Grade 7");
//   }
// }, []);

//   const gradeModes = [
    
//     "Grade 7",
//   ];

//   const features = [
//     {
//       id: 1,
//       title: "Ask a Question",
//       description: "Get instant help with any academic question",
//       icon: MessageCircle,
//       color: "text-blue-500",
//       bgColor: "bg-blue-50",
//       action: () => navigate("/chat")
//     },
//     {
//       id: 2,
//       title: "Generate Worksheets",
//       description: "Digitize and analyze educational materials",
//       icon: Upload,
//       color: "text-green-500",
//       bgColor: "bg-green-50",
//       action: () => navigate("/worksheet")
//     },
//     {
//       id: 3,
//       title: "Generate Visual Aids",
//       description: "Create drawings and diagrams for better understanding",
//       icon: Palette,
//       color: "text-purple-500",
//       bgColor: "bg-purple-50",
//       action: () => navigate("/chat")
//     },
//     {
//       id: 5,
//       title: "Weekly Lesson Planner",
//       description: "Plan and organize your weekly curriculum",
//       icon: Calendar,
//       color: "text-orange-500",
//       bgColor: "bg-orange-50",
//       action: () => navigate("/chat")
//     },
//     {
//   id: 6,
//   title: "Concept Visualizer",
//   description: "Enter a topic to get video-based explanations",
//   icon: BookOpen, // You can change to another icon like 'PlayCircle' or 'Video'
//   color: "text-pink-500",
//   bgColor: "bg-pink-50",
//   action: () => navigate("/concept-video")
// }

//     // {
//     //   id: 6,
//     //   title: "Educational Game Generator",
//     //   description: "Create engaging games for your students",
//     //   icon: Gamepad2,
//     //   color: "text-pink-500",
//     //   bgColor: "bg-pink-50",
//     //   action: () => navigate("/chat")
//     // },
//     // {
//     //   id: 7,
//     //   title: "Try Cow",
//     //   description: "Experimental feature - coming soon!",
//     //   icon: BookOpen,
//     //   color: "text-gray-500",
//     //   bgColor: "bg-gray-50",
//     //   action: () => toast({
//     //     title: "Coming Soon",
//     //     description: "This feature is under development!",
//     //   })
//     // }
//   ];

//   const handleFeatureClick = (feature: typeof features[0]) => {
//     if (feature.action) {
//       feature.action();
//     } else {
//       toast({
//         title: `${feature.title} Selected`,
//         description: `You clicked on: ${feature.description}`,
//       });
//     }
//   };

//   if (!userData) {
//     return (
//       <div className="min-h-screen gradient-bg flex items-center justify-center">
//         <div className="text-center">
//           <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-foreground mb-2">Loading...</h1>
//           <p className="text-muted-foreground">Please wait while we load your dashboard</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen gradient-bg">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <GraduationCap className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-foreground">Sahayak</h1>
//                 <p className="text-sm text-muted-foreground">Education Assistant</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <User className="h-5 w-5 text-muted-foreground" />
//               <span className="text-sm text-muted-foreground">{userData.name}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Greeting and Grade Mode */}
//         <div className="mb-8 animate-fade-in">
//           <h2 className="text-3xl font-bold text-foreground mb-4">
//             Hello, {userData.name}! 👋
//           </h2>
          
//           <div className="flex items-center space-x-4 mb-6">
//             <span className="text-lg font-medium text-foreground">Grade Mode:</span>
//             <Select value={gradeMode} onValueChange={setGradeMode}>
//               <SelectTrigger className="w-48">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {gradeModes.map((mode) => (
//                   <SelectItem key={mode} value={mode}>
//                     {mode}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Features Grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <Card 
//               key={feature.id} 
//               className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
//               style={{ animationDelay: `${index * 100}ms` }}
//               onClick={() => handleFeatureClick(feature)}
//             >
//               <CardHeader className="pb-3">
//                 <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
//                   <feature.icon className="h-6 w-6" />
//                 </div>
//                 <CardTitle className="text-lg font-semibold text-foreground">
//                   {feature.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-muted-foreground">
//                   {feature.description}
//                 </CardDescription>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {(userData.role === "Student"
//     ? features.filter(f => f.title === "Ask a Question" || f.title === "Generate Worksheets")
//     : features
//   ).map((feature, index) => (
//     <Card 
//       key={feature.id}
//       className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
//       style={{ animationDelay: `${index * 100}ms` }}
//       onClick={() => handleFeatureClick(feature)}
//     >
//       <CardHeader className="pb-3">
//         <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
//           <feature.icon className="h-6 w-6" />
//         </div>
//         <CardTitle className="text-lg font-semibold text-foreground">
//           {feature.title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <CardDescription className="text-muted-foreground">
//           {feature.description}
//         </CardDescription>
//       </CardContent>
//     </Card>
//   ))}
// </div>


//         {/* Quick Actions */}
//         {/* <div className="mt-12 animate-fade-in">
//           <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <MessageCircle className="h-6 w-6" />
//               <span>New Question</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Upload className="h-6 w-6" />
//               <span>Upload File</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Calendar className="h-6 w-6" />
//               <span>Plan Lesson</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Gamepad2 className="h-6 w-6" />
//               <span>Create Game</span>
//             </Button>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;


//manas
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { 
//   MessageCircle, 
//   Upload, 
//   Palette, 
//   Mic, 
//   Calendar, 
//   Gamepad2, 
//   BookOpen,
//   GraduationCap,
//   User
// } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { useNavigate } from "react-router-dom";

// interface UserData {
//   role: string;
//   name: string;
//   email: string;
//   useCase: string;
//   gradeLevel: string | null;
// }

// const TeacherDashboard = () => {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   // const [gradeMode, setGradeMode] = useState<string>("General");
//   const [gradeMode, setGradeMode] = useState<string>("Grade 7");
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const storedData = localStorage.getItem('userData');
//   //   if (storedData) {
//   //     const parsedData = JSON.parse(storedData);
//   //     setUserData(parsedData);
//   //     setGradeMode(parsedData.useCase === "General Purpose" ? "General" : parsedData.useCase);
//   //   }
//   // }, []);

//   useEffect(() => {
//   const storedData = localStorage.getItem('userData');
//   if (storedData) {
//     const parsedData = JSON.parse(storedData);
//     setUserData(parsedData);

//     // Set grade level if available, otherwise fallback to "Grade 7"
//     setGradeMode(parsedData.gradeLevel || "Grade 7");
//   } else {
//     // If no userData found, default to Grade 7
//     setGradeMode("Grade 7");
//   }
// }, []);

//   const gradeModes = [
    
//     "Grade 7",
//   ];

//   const features = [
//     {
//       id: 1,
//       title: "Ask a Question",
//       description: "Get instant help with any academic question",
//       icon: MessageCircle,
//       color: "text-blue-500",
//       bgColor: "bg-blue-50",
//       action: () => navigate("/chat")
//     },
//     {
//       id: 2,
//       title: "Generate Worksheets",
//       description: "Digitize and analyze educational materials",
//       icon: Upload,
//       color: "text-green-500",
//       bgColor: "bg-green-50",
//       action: () => navigate("/worksheet")
//     },
//     {
//       id: 3,
//       title: "Generate Visual Aids",
//       description: "Create drawings and diagrams for better understanding",
//       icon: Palette,
//       color: "text-purple-500",
//       bgColor: "bg-purple-50",
//       action: () => navigate("/chat")
//     },
//     {
//       id: 5,
//       title: "Weekly Lesson Planner",
//       description: "Plan and organize your weekly curriculum",
//       icon: Calendar,
//       color: "text-orange-500",
//       bgColor: "bg-orange-50",
//       action: () => navigate("/chat")
//     },
//     {
//   id: 6,
//   title: "Concept Visualizer",
//   description: "Enter a topic to get video-based explanations",
//   icon: BookOpen, // You can change to another icon like 'PlayCircle' or 'Video'
//   color: "text-pink-500",
//   bgColor: "bg-pink-50",
//   action: () => navigate("/concept-video")
// }

//     // {
//     //   id: 6,
//     //   title: "Educational Game Generator",
//     //   description: "Create engaging games for your students",
//     //   icon: Gamepad2,
//     //   color: "text-pink-500",
//     //   bgColor: "bg-pink-50",
//     //   action: () => navigate("/chat")
//     // },
//     // {
//     //   id: 7,
//     //   title: "Try Cow",
//     //   description: "Experimental feature - coming soon!",
//     //   icon: BookOpen,
//     //   color: "text-gray-500",
//     //   bgColor: "bg-gray-50",
//     //   action: () => toast({
//     //     title: "Coming Soon",
//     //     description: "This feature is under development!",
//     //   })
//     // }
//   ];

//   const handleFeatureClick = (feature: typeof features[0]) => {
//     if (feature.action) {
//       feature.action();
//     } else {
//       toast({
//         title: `${feature.title} Selected`,
//         description: `You clicked on: ${feature.description}`,
//       });
//     }
//   };

//   if (!userData) {
//     return (
//       <div className="min-h-screen gradient-bg flex items-center justify-center">
//         <div className="text-center">
//           <GraduationCap className="h-16 w-16 text-primary mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-foreground mb-2">Loading...</h1>
//           <p className="text-muted-foreground">Please wait while we load your dashboard</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen gradient-bg">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="bg-primary/10 p-2 rounded-full">
//                 <GraduationCap className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-foreground">Sahayak</h1>
//                 <p className="text-sm text-muted-foreground">Education Assistant</p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <User className="h-5 w-5 text-muted-foreground" />
//               <span className="text-sm text-muted-foreground">{userData.name}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         {/* Greeting and Grade Mode */}
//         <div className="mb-8 animate-fade-in">
//           <h2 className="text-3xl font-bold text-foreground mb-4">
//             Hello, {userData.name}! 👋
//           </h2>
          
//           <div className="flex items-center space-x-4 mb-6">
//             <span className="text-lg font-medium text-foreground">Grade Mode:</span>
//             <Select value={gradeMode} onValueChange={setGradeMode}>
//               <SelectTrigger className="w-48">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {gradeModes.map((mode) => (
//                   <SelectItem key={mode} value={mode}>
//                     {mode}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Features Grid
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {features.map((feature, index) => (
//             <Card 
//               key={feature.id} 
//               className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
//               style={{ animationDelay: `${index * 100}ms` }}
//               onClick={() => handleFeatureClick(feature)}
//             >
//               <CardHeader className="pb-3">
//                 <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
//                   <feature.icon className="h-6 w-6" />
//                 </div>
//                 <CardTitle className="text-lg font-semibold text-foreground">
//                   {feature.title}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <CardDescription className="text-muted-foreground">
//                   {feature.description}
//                 </CardDescription>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//   {(userData.role === "Student"
//     ? features.filter(f => f.title === "Ask a Question" || f.title === "Generate Worksheets")
//     : features
//   ).map((feature, index) => (
//     <Card 
//       key={feature.id}
//       className={`card-hover cursor-pointer border-0 shadow-md animate-fade-in ${feature.bgColor}/30`}
//       style={{ animationDelay: `${index * 100}ms` }}
//       onClick={() => handleFeatureClick(feature)}
//     >
//       <CardHeader className="pb-3">
//         <div className={`${feature.bgColor} ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
//           <feature.icon className="h-6 w-6" />
//         </div>
//         <CardTitle className="text-lg font-semibold text-foreground">
//           {feature.title}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <CardDescription className="text-muted-foreground">
//           {feature.description}
//         </CardDescription>
//       </CardContent>
//     </Card>
//   ))}
// </div>


//         {/* Quick Actions */}
//         {/* <div className="mt-12 animate-fade-in">
//           <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <MessageCircle className="h-6 w-6" />
//               <span>New Question</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Upload className="h-6 w-6" />
//               <span>Upload File</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Calendar className="h-6 w-6" />
//               <span>Plan Lesson</span>
//             </Button>
//             <Button 
//               variant="outline" 
//               className="h-20 flex-col space-y-2"
//               onClick={() => navigate("/chat")}
//             >
//               <Gamepad2 className="h-6 w-6" />
//               <span>Create Game</span>
//             </Button>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;



// mera final
// import { MessageCircle, FileText, Image, Calendar, Eye, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";

// export const TeacherDashboard = () => {
//   const features = [
//     {
//       title: "Ask a Question",
//       description: "Get instant help with any academic question",
//       icon: MessageCircle,
//       buttonText: "Ask...",
//     },
//     {
//       title: "Generate Worksheets",
//       description: "Digitize and analyse educational materials",
//       icon: FileText,
//       buttonText: "Generate...",
//     },
//     {
//       title: "Generate Visual Aids",
//       description: "Create drawings and diagrams for better understanding",
//       icon: Image,
//       buttonText: "Generate...",
//     },
//     {
//       title: "Weekly Lesson Planner",
//       description: "Plan and organize your weekly curriculum",
//       icon: Calendar,
//       buttonText: "Plan...",
//     },
//     {
//       title: "Concept Visualizer",
//       description: "Enter a topic to get video-based exploration",
//       icon: Eye,
//       buttonText: "Generate...",
//     },
//   ];

//   return (
//     <div className="h-screen bg-gradient-dashboard relative overflow-hidden">
//       {/* Main Content */}
//       <main className="px-6 py-8 h-full">
//         <div className="max-w-7xl mx-auto h-full flex flex-col">
//           {/* Welcome Section */}
//           <div className="mb-16">
//             <div className="flex items-center justify-between">
//               <h2 className="text-5xl font-bold text-white leading-tight">
//                 Hello, Teacher !
//               </h2>
//               <div className="flex items-center gap-3 text-white/70">
//                 <span>Grade Mode:</span>
//                 <Select defaultValue="grade7">
//                   <SelectTrigger className="w-36 bg-white/10 border-white/20 text-white backdrop-blur-sm">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="grade1">Grade 1</SelectItem>
//                     <SelectItem value="grade2">Grade 2</SelectItem>
//                     <SelectItem value="grade3">Grade 3</SelectItem>
//                     <SelectItem value="grade4">Grade 4</SelectItem>
//                     <SelectItem value="grade5">Grade 5</SelectItem>
//                     <SelectItem value="grade6">Grade 6</SelectItem>
//                     <SelectItem value="grade7">Grade 7</SelectItem>
//                     <SelectItem value="grade8">Grade 8</SelectItem>
//                     <SelectItem value="grade9">Grade 9</SelectItem>
//                     <SelectItem value="grade10">Grade 10</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Feature Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 flex-1">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <Card
//                   key={index}
//                   className="bg-gradient-card backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group h-72"
//                 >
//                   <CardContent className="p-8">
//                     <div className="flex flex-col items-start gap-4">
//                       <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition-colors">
//                         <Icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                           {feature.title}
//                         </h3>
//                         <p className="text-white/70 text-sm leading-relaxed mb-4">
//                           {feature.description}
//                         </p>
//                       </div>
//                       <Button 
//                         className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
//                         onClick={() => window.location.href = 'http://localhost:8080/chat'}
//                       >
//                         {feature.buttonText}
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default TeacherDashboard



//final

// import { MessageCircle, FileText, Image, Calendar, Eye, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom"; // React Router approach

// export const TeacherDashboard = () => {
//   const navigate = useNavigate(); // Hook for navigation

//   const features = [
//     {
//       title: "Ask a Question",
//       description: "Get instant help with any academic question",
//       icon: MessageCircle,
//       buttonText: "Ask...",
//     },
//     {
//       title: "Generate Worksheets",
//       description: "Digitize and analyse educational materials",
//       icon: FileText,
//       buttonText: "Generate...",
//     },
//     {
//       title: "Generate Visual Aids",
//       description: "Create drawings and diagrams for better understanding",
//       icon: Image,
//       buttonText: "Generate...",
//     },
//     {
//       title: "Weekly Lesson Planner",
//       description: "Plan and organize your weekly curriculum",
//       icon: Calendar,
//       buttonText: "Plan...",
//     },
//     {
//       title: "Concept Visualizer",
//       description: "Enter a topic to get video-based exploration",
//       icon: Eye,
//       buttonText: "Generate...",
//     },
//   ];

//   const handleNavigateToChat = () => {
//     console.log('Button clicked - navigating to chat');
//     try {
//       navigate('/pages/ChatQnA');
//     } catch (error) {
//       console.error('Navigation error:', error);
//       // Fallback navigation
//       window.location.href = '/pages/ChatQnA';
//     }
//   };

//   return (
//     <div className="h-screen bg-gradient-dashboard relative overflow-hidden">
//       {/* Main Content */}
//       <main className="px-6 py-8 h-full">
//         <div className="max-w-7xl mx-auto h-full flex-col">
//           {/* Welcome Section */}
//           <div className="mb-16">
//             <div className="flex items-center justify-between">
//               <h2 className="text-5xl font-bold text-white leading-tight">
//                 Hello, Teacher !
//               </h2>
//               <div className="flex items-center gap-3 text-white/70">
//                 <span>Grade Mode:</span>
//                 <Select defaultValue="grade7">
//                   <SelectTrigger className="w-36 bg-white/10 border-white/20 text-white backdrop-blur-sm">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="grade1">Grade 1</SelectItem>
//                     <SelectItem value="grade2">Grade 2</SelectItem>
//                     <SelectItem value="grade3">Grade 3</SelectItem>
//                     <SelectItem value="grade4">Grade 4</SelectItem>
//                     <SelectItem value="grade5">Grade 5</SelectItem>
//                     <SelectItem value="grade6">Grade 6</SelectItem>
//                     <SelectItem value="grade7">Grade 7</SelectItem>
//                     <SelectItem value="grade8">Grade 8</SelectItem>
//                     <SelectItem value="grade9">Grade 9</SelectItem>
//                     <SelectItem value="grade10">Grade 10</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>
//           </div>

//           {/* Feature Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 flex-1">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <Card
//                   key={index}
//                   className="bg-gradient-card backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 group h-72"
//                 >
//                   <CardContent className="p-8">
//                     <div className="flex flex-col items-start gap-4">
//                       <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/15 transition-colors">
//                         <Icon className="w-6 h-6 text-white" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="text-xl font-semibold text-white mb-2">
//                           {feature.title}
//                         </h3>
//                         <p className="text-white/70 text-sm leading-relaxed mb-4">
//                           {feature.description}
//                         </p>
//                       </div>
//                       <Button 
//                         className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-all duration-200 text-sm"
//                         onClick={handleNavigateToChat}
//                       >
//                         {feature.buttonText}
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default TeacherDashboard;