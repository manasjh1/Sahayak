// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { MessageCircle, User, Bot } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";

// interface WorksheetMessage {
//   id: number;
//   type: 'user' | 'assistant';
//   content: string;
//   timestamp: Date;
// }

// const ChatQnA = () => {
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [messages, setMessages] = useState<WorksheetMessage[]>([
//     {
//       id: 1,
//       type: 'assistant',
//       content: "Hello! I'm here to answer your questions. Ask me anything!",
//       timestamp: new Date(),
//     },
//   ]);

//   const { toast } = useToast();

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || loading) return;

//     const userMessage: WorksheetMessage = {
//       id: messages.length + 1,
//       type: "user",
//       content: inputMessage,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputMessage("");
//     setLoading(true);

//     try {
//       const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
//         method: "POST",
//         headers: { 
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify({ question: inputMessage }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       const assistantMessage: WorksheetMessage = {
//         id: messages.length + 2,
//         type: "assistant",
//         content: data.answer || "Sorry, I couldn't find an answer.", // Backend returns 'answer', not 'response'
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (err) {
//       console.error("Error:", err);
//       toast({
//         title: "Error",
//         description: "Failed to get a response from the server.",
//       });

//       const errorMessage: WorksheetMessage = {
//         id: messages.length + 2,
//         type: "assistant",
//         content: "Sorry, I encountered an error. Please try again.",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen gradient-bg">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center space-x-4">
//             <div className="bg-primary/10 p-2 rounded-full">
//               <MessageCircle className="h-6 w-6 text-primary" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">Chat QnA</h1>
//               <p className="text-sm text-muted-foreground">Ask your doubts freely!</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex w-full">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-gray-200 px-4 py-6 hidden md:block">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">Previous Topics</h2>
//           <div className="space-y-3">
//             {[
//               "Math Doubts",
//               "Science Explanation",
//               "JavaScript Tips",
//               "Python Basics",
//             ].map((item, index) => (
//               <button
//                 key={index}
//                 className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition-all"
//                 onClick={() => setInputMessage(item)}
//               >
//                 {item}
//               </button>
//             ))}
//           </div>
//         </aside>

//         {/* Main Chat Section */}
//         <main className="flex-1 px-4 py-6">
//           <div className="max-w-5xl mx-auto">
//             <Card className="h-full">
//               <CardHeader>
//                 <CardTitle className="text-foreground">Ask Your Question</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {/* Messages */}
//                 <div className="bg-muted/30 rounded-lg p-4 h-96 overflow-y-auto overflow-x-hidden space-y-4">
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
//                     >
//                       <div
//                         className={`max-w-[80%] rounded-lg p-3 ${
//                           message.type === "user"
//                             ? "bg-primary text-primary-foreground ml-4"
//                             : "bg-white text-foreground mr-4 shadow-sm"
//                         }`}
//                       >
//                         <div className="flex items-start space-x-2">
//                           {message.type === "assistant" && <Bot className="h-5 w-5 mt-0.5 text-primary" />}
//                           {message.type === "user" && <User className="h-5 w-5 mt-0.5 text-primary-foreground" />}
//                           <div>
//                             <p className="text-sm font-medium mb-1">
//                               {message.type === "assistant" ? "Answer" : "You"}
//                             </p>
//                             <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {loading && (
//                     <div className="flex justify-start">
//                       <div className="bg-white text-foreground mr-4 shadow-sm rounded-lg p-3">
//                         <div className="flex items-center space-x-2">
//                           <Bot className="h-5 w-5 text-primary" />
//                           <div className="flex space-x-1">
//                             <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
//                             <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                             <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Input */}
//                 <div className="space-y-3">
//                   <div className="flex space-x-2">
//                     <textarea
//                       value={inputMessage}
//                       onChange={(e) => setInputMessage(e.target.value)}
//                       placeholder="Ask your question here..."
//                       className="flex-1 resize-none p-3 border border-input rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-20 overflow-y-auto"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter" && !e.shiftKey) {
//                           e.preventDefault();
//                           handleSendMessage();
//                         }
//                       }}
//                       disabled={loading}
//                     />
//                     <Button 
//                       onClick={handleSendMessage} 
//                       className="px-6"
//                       disabled={loading || !inputMessage.trim()}
//                     >
//                       {loading ? "Sending..." : "Send"}
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ChatQnA;





import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, FileText, Image, Calendar, Eye } from "lucide-react";

const TeacherDashboard = () => {
  const [selectedGrade, setSelectedGrade] = useState("Grade 7");

  const dashboardCards = [
    {
      icon: MessageCircle,
      title: "Ask a Question",
      description: "Get instant help with any academic question",
      buttonText: "Ask...",
      route: "/chat-qna"
    },
    {
      icon: FileText,
      title: "Generate Worksheets",
      description: "Digitize and analyse educational materials",
      buttonText: "Generate...",
      route: "/worksheet-generator"
    },
    {
      icon: Image,
      title: "Generate Visual Aids",
      description: "Create drawings and diagrams for better understanding",
      buttonText: "Generate...",
      route: "/visual-aids"
    },
    {
      icon: Calendar,
      title: "Weekly Lesson Planner",
      description: "Plan and organize your weekly curriculum",
      buttonText: "Plan...",
      route: "/lesson-planner"
    },
    {
      icon: Eye,
      title: "Concept Visualizer",
      description: "Enter a topic to get video-based exploration",
      buttonText: "Generate...",
      route: "/concept-visualizer"
    }
  ];

  return (
    <div className="min-h-screen max-h-screen overflow-hidden gradient-bg">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Left Side - Hello Teacher */}
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                BEST LEARNING PLATFORM
              </p>
              <h1 className="text-3xl font-bold text-foreground">Hello, Teacher !</h1>
            </div>
            
            {/* Right Side - Grade Mode */}
            <div className="flex items-center space-x-3">
              <span className="text-base font-medium text-muted-foreground">Grade Mode:</span>
              <select 
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="bg-white/90 border border-gray-300 rounded-xl px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 h-[calc(100vh-140px)] overflow-hidden">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
          {dashboardCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={index} 
                className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/90 backdrop-blur-sm flex flex-col"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center text-center space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Button */}
                  <div className="pt-6 flex justify-center">
                    <Button 
                      className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {card.buttonText}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;