
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Plus, Search, User, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  error?: boolean;
}

const chatTopics = [
  "Photosynthesis",
  "Light", 
  "Respiration in Organisms",
  "Transportation in Animals and Plants",
  "Acids, Bases and Salts",
  "Forests Our Lifeline",
  "Electricity"
];

export const EnhancedChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello, I am here to answer, Ask me anything!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [question, setQuestion] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline' | 'unknown'>('unknown');
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const checkBackendStatus = async () => {
    setBackendStatus('checking');
    try {
      const response = await fetch("https://rag-bot-53xj.onrender.com/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ question: "test" }),
      });
      
      if (response.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (error) {
      console.error("Backend check failed:", error);
      setBackendStatus('offline');
    }
  };

  const handleSubmit = async () => {
    if (!question.trim() || loading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: question,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    const currentQuestion = question;
    setQuestion("");
    setLoading(true);

    try {
      // Add timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ 
          question: currentQuestion,
          difficulty: difficulty.toLowerCase() // Include difficulty if backend supports it
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Backend response:", data); // Debug log

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer || data.response || "Sorry, I couldn't find an answer.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setBackendStatus('online');
      
    } catch (err) {
      console.error("Error:", err);
      setBackendStatus('offline');
      
      let errorMessage = "Sorry, I encountered an error. Please try again.";
      
      if (err.name === 'AbortError') {
        errorMessage = "Request timed out. The server might be slow or unavailable.";
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (err.message.includes('HTTP')) {
        errorMessage = `Server error: ${err.message}`;
      }
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        isUser: false,
        timestamp: new Date(),
        error: true,
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: "1",
        content: "Hello, I am here to answer, Ask me anything!",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
    setQuestion("");
  };

  const handleTopicClick = (topic: string) => {
    setQuestion(`Tell me about ${topic}`);
  };

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'online': return 'Backend Online';
      case 'offline': return 'Backend Offline';
      case 'checking': return 'Checking...';
      default: return 'Unknown';
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      {/* Sidebar */}
      <div className="w-80 bg-slate-900/90 backdrop-blur-md border-r border-teal-500/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-6 h-6 text-teal-400" />
            <h1 className="text-xl font-semibold text-white">Chat Q&A</h1>
            <div className="ml-auto w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-slate-600/50 transition-colors cursor-pointer">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </div>
          
          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2 mb-4">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
            <span className="text-xs text-slate-400">{getStatusText()}</span>
            {backendStatus === 'offline' && (
              <Button 
                onClick={checkBackendStatus}
                variant="ghost" 
                size="sm"
                className="text-xs text-teal-400 p-1 h-auto"
              >
                Retry
              </Button>
            )}
          </div>
          
          <p className="text-slate-400 text-sm">Ask your doubt freely!</p>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <Button 
            onClick={handleNewChat}
            className="w-full justify-start gap-3 bg-teal-500 hover:bg-teal-600 text-white font-medium"
          >
            <Plus className="w-4 h-4" />
            New chat
          </Button>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search chat" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
            />
          </div>
        </div>

        {/* Previous Topics */}
        <div className="flex-1 px-4 pb-4">
          <h2 className="text-sm font-medium text-slate-400 mb-3">Previous Topics</h2>
          <div className="space-y-1">
            {chatTopics
              .filter(topic => 
                searchQuery === "" || 
                topic.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((topic, index) => (
              <Button
                key={index}
                onClick={() => handleTopicClick(topic)}
                variant="ghost"
                className={`w-full justify-start text-left p-3 h-auto text-slate-300 hover:text-white hover:bg-teal-500/20 transition-colors ${
                  index === 0 ? 'bg-teal-500/20 border border-teal-500/30' : ''
                }`}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 p-6">
          <Card className="h-full bg-slate-800/80 backdrop-blur-lg border-slate-700/50 shadow-2xl p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-white mb-6">Ask your Question</h2>
            
            {/* Backend Error Warning */}
            {backendStatus === 'offline' && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Backend Connection Failed</p>
                  <p className="text-red-300 text-sm">The API server is not responding. Please check if the backend is running.</p>
                </div>
              </div>
            )}
            
            {/* Messages */}
            <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`${message.error ? 'bg-red-500' : 'bg-teal-500'} text-white font-semibold`}>
                        {message.error ? '!' : 'S'}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-md p-4 rounded-2xl ${
                      message.isUser
                        ? 'bg-slate-600/80 text-white shadow-lg backdrop-blur-sm'
                        : message.error 
                        ? 'bg-red-500/20 border border-red-500/30 text-red-100 shadow-lg backdrop-blur-sm'
                        : 'bg-slate-700/60 text-white shadow-lg backdrop-blur-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.isUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-slate-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-teal-500 text-white font-semibold">
                      S
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-slate-700/60 text-white shadow-lg backdrop-blur-sm p-4 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Difficulty Selector */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Difficulty</span>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Easy" className="text-white hover:bg-slate-700">Easy</SelectItem>
                    <SelectItem value="Medium" className="text-white hover:bg-slate-700">Medium</SelectItem>
                    <SelectItem value="Hard" className="text-white hover:bg-slate-700">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <Input
                placeholder="Ask your question here ..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                disabled={loading}
              />
              <Button 
                onClick={handleSubmit}
                disabled={loading || !question.trim()}
                className="px-6 bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "..." : "Generate"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatInterface;

















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



//bekar ws

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { MessageCircle, FileText, Image, Calendar, Eye } from "lucide-react";

// const TeacherDashboard = () => {
//   const [selectedGrade, setSelectedGrade] = useState("Grade 7");

//   const dashboardCards = [
//     {
//       icon: MessageCircle,
//       title: "Ask a Question",
//       description: "Get instant help with any academic question",
//       buttonText: "Ask...",
//       route: "/chat-qna"
//     },
//     {
//       icon: FileText,
//       title: "Generate Worksheets",
//       description: "Digitize and analyse educational materials",
//       buttonText: "Generate...",
//       route: "/worksheet-generator"
//     },
//     {
//       icon: Image,
//       title: "Generate Visual Aids",
//       description: "Create drawings and diagrams for better understanding",
//       buttonText: "Generate...",
//       route: "/visual-aids"
//     },
//     {
//       icon: Calendar,
//       title: "Weekly Lesson Planner",
//       description: "Plan and organize your weekly curriculum",
//       buttonText: "Plan...",
//       route: "/lesson-planner"
//     },
//     {
//       icon: Eye,
//       title: "Concept Visualizer",
//       description: "Enter a topic to get video-based exploration",
//       buttonText: "Generate...",
//       route: "/concept-visualizer"
//     }
//   ];

//   return (
//     <div className="min-h-screen max-h-screen overflow-hidden gradient-bg">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-border/50">
//         <div className="container mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             {/* Left Side - Hello Teacher */}
//             <div>
//               <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
//                 BEST LEARNING PLATFORM
//               </p>
//               <h1 className="text-3xl font-bold text-foreground">Hello, Teacher !</h1>
//             </div>
            
//             {/* Right Side - Grade Mode */}
//             <div className="flex items-center space-x-3">
//               <span className="text-base font-medium text-muted-foreground">Grade Mode:</span>
//               <select 
//                 value={selectedGrade}
//                 onChange={(e) => setSelectedGrade(e.target.value)}
//                 className="bg-white/90 border border-gray-300 rounded-xl px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 <option>Grade 7</option>
//                 <option>Grade 8</option>
//                 <option>Grade 9</option>
//                 <option>Grade 10</option>
//                 <option>Grade 11</option>
//                 <option>Grade 12</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-6 py-8 h-[calc(100vh-140px)] overflow-hidden">
//         {/* Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-full">
//           {dashboardCards.map((card, index) => {
//             const Icon = card.icon;
//             return (
//               <Card 
//                 key={index} 
//                 className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-white/90 backdrop-blur-sm flex flex-col"
//               >
//                 <CardContent className="p-8 flex flex-col h-full">
//                   {/* Icon */}
//                   <div className="flex justify-center mb-8">
//                     <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
//                       <Icon className="w-10 h-10 text-white" />
//                     </div>
//                   </div>
                  
//                   {/* Content */}
//                   <div className="flex-1 flex flex-col justify-center text-center space-y-6">
//                     <div className="space-y-4">
//                       <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
//                       <p className="text-muted-foreground text-base leading-relaxed">
//                         {card.description}
//                       </p>
//                     </div>
//                   </div>
                  
//                   {/* Button */}
//                   <div className="pt-6 flex justify-center">
//                     <Button 
//                       className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-medium px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
//                     >
//                       {card.buttonText}
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDashboard;