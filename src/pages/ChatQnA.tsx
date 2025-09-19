// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { MessageCircle, User, Search, Edit, ChevronDown } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface ChatMessage {
//   id: number;
//   type: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// const ChatQnA = () => {
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [difficulty, setDifficulty] = useState<string>("Medium");
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: 1,
//       type: "assistant",
//       content: "Hello, I am here to answer, Ask me anything!",
//       timestamp: new Date(),
//     },
//   ]);

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const { toast } = useToast();

//   const handleSendMessage = async () => {
//     if (!inputMessage.trim() || loading) return;

//     const userMessage: ChatMessage = {
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
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ question: inputMessage }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       const assistantMessage: ChatMessage = {
//         id: messages.length + 2,
//         type: "assistant",
//         content: data.answer || "Sorry, I couldn't find an answer.",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (err) {
//       console.error("Error:", err);
//       toast({
//         title: "Error",
//         description: "Failed to get a response from the server.",
//       });

//       const errorMessage: ChatMessage = {
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

//   const chatTopics = [
//     "Photosynthesis",
//     "Light",
//     "Respiration in Organisms",
//     "Transportation in Animals and Plants",
//     "Acids, Bases and Salts",
//     "Forests Our Lifeline",
//     "Electricity",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#11545B] to-[#5529A9] text-white">
//       <div className="flex h-screen">
//         {/* Sidebar */}
//         <aside className="w-80 bg-[#000000]/20 backdrop-blur-md border-r border-[#11545B]/30">
//           <div className="p-6 border-b border-[#11545B]/30"></div>

//           <div className="p-6 space-y-6">
//             <h2 className="text-lg font-semibold text-white/90 mb-4">
//               Previous Topics
//             </h2>

//             <div className="space-y-3 mb-6">
//               <button className="flex items-center space-x-3 w-full p-3 text-left text-[#46F1E0] hover:text-white hover:bg-[#11545B]/20 rounded-lg transition-all duration-200 border border-[#11545B]/30">
//                 <Edit className="h-4 w-4" />
//                 <span className="text-sm">New chat</span>
//               </button>
//               <button className="flex items-center space-x-3 w-full p-3 text-left text-[#46F1E0] hover:text-white hover:bg-[#11545B]/20 rounded-lg transition-all duration-200 border border-[#11545B]/30">
//                 <Search className="h-4 w-4" />
//                 <span className="text-sm">Search chat</span>
//               </button>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-[#46F1E0]/70 mb-3">
//                 Chats
//               </h3>
//               <div className="space-y-2">
//                 {chatTopics.map((topic, index) => (
//                   <button
//                     key={index}
//                     className="w-full text-left px-4 py-3 rounded-lg bg-[#11545B]/20 hover:bg-[#11545B]/40 text-sm text-white/90 transition-all duration-200 border border-[#11545B]/40"
//                   >
//                     {topic}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="flex-1 flex flex-col">
//           {/* Top Header */}
//           <header className="bg-[#14273F] border-b border-white/20 p-4 flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <MessageCircle className="h-10 w-10 text-white" />
//               <div>
//                 <h1 className="text-lg font-semibold text-white">Chat Q&A</h1>
//                 <p className="text-sm text-slate-300">Ask your doubt freely!</p>
//               </div>
//             </div>
//             <button className="w-10 h-10 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 backdrop-blur-sm">
//               <User className="h-5 w-5 text-white/80" />
//             </button>
//           </header>

//           {/* Chat Content */}
//           <div className="flex-1 flex items-center justify-center p-4">
//             <div className="w-full max-w-4xl">
//               <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-7 border border-white/70 shadow-xl flex flex-col h-[550px]">
//                 <h2 className="text-3xl font-semibold text-white mb-2">
//                   Ask your Question
//                 </h2>

//                 {/* Messages Area */}
//                 <div className="flex-1 bg rounded-2xl p-4 h-[350px] overflow-y-auto mb-4">
//                   {messages.map((message) => (
//                     <div key={message.id} className="mb-4">
//                       {message.type === "assistant" && (
//                         <div className="flex items-start space-x-4">
//                           <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center flex-shrink-0">
//                             <span className="text-sm font-bold text-white">
//                               🤖
//                             </span>
//                           </div>
//                           <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-4 max-w-lg border border-white/40">
//                             <p className="text-sm text-[#000000]">
//                               {message.content}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                       {message.type === "user" && (
//                         <div className="flex justify-end mb-6">
//                           <div className="bg-[#5529A9]/80 backdrop-blur-sm rounded-2xl rounded-tr-sm px-5 py-4 max-w-lg border border-white/30">
//                             <p className="text-sm text-white">
//                               {message.content}
//                             </p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}

//                   {loading && (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center flex-shrink-0">
//                         <span className="text-sm font-bold text-white">🤖</span>
//                       </div>
//                       <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-4 border border-white/40">
//                         <div className="flex space-x-2">
//                           <div className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"></div>
//                           <div
//                             className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"
//                             style={{ animationDelay: "0.1s" }}
//                           ></div>
//                           <div
//                             className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                   {/* 👇 Auto scroll anchor */}
//                   <div ref={messagesEndRef} />
//                 </div>

               
//                 {/* Input Area */}
//                 <div className="flex space-x-4">
//                   <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     placeholder="Ask your question here ..."
//                     className="flex-1 bg-white/90 backdrop-blur-sm text-[#000000] placeholder-[#11545B]/60 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/40"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter" && !e.shiftKey) {
//                         e.preventDefault();
//                         handleSendMessage();
//                       }
//                     }}
//                     disabled={loading}
//                   />
//                   <Button
//                     onClick={handleSendMessage}
//                     disabled={loading || !inputMessage.trim()}
//                     className="bg-[#000000]/80 backdrop-blur-sm hover:bg-[#000000]/90 text-white border border-white/40 px-10 py-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-white/10"
//                   >
//                     {loading ? "..." : "Generate"}
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ChatQnA;


// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MessageCircle, Plus, Search, User } from "lucide-react";

// interface Message {
//   id: string;
//   content: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// const chatTopics = [
//   "Photosynthesis",
//   "Light", 
//   "Respiration in Organisms",
//   "Transportation in Animals and Plants",
//   "Acids, Bases and Salts",
//   "Forests Our Lifeline",
//   "Electricity"
// ];

// export const EnhancedChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       content: "Hello, I am here to answer, Ask me anything!",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ]);
//   const [question, setQuestion] = useState("");
//   const [difficulty, setDifficulty] = useState("Medium");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState("");
  
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const handleSubmit = async () => {
//     if (!question.trim() || loading) return;

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: question,
//       isUser: true,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, newMessage]);
//     const currentQuestion = question;
//     setQuestion("");
//     setLoading(true);

//     try {
//       const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ question: currentQuestion }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();

//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: data.answer || "Sorry, I couldn't find an answer.",
//         isUser: false,
//         timestamp: new Date(),
//       };
      
//       setMessages(prev => [...prev, aiResponse]);
//     } catch (err) {
//       console.error("Error:", err);
      
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "Sorry, I encountered an error. Please try again.",
//         isUser: false,
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewChat = () => {
//     setMessages([
//       {
//         id: "1",
//         content: "Hello, I am here to answer, Ask me anything!",
//         isUser: false,
//         timestamp: new Date(),
//       },
//     ]);
//     setQuestion("");
//   };

//   const handleTopicClick = (topic: string) => {
//     setQuestion(`Tell me about ${topic}`);
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
//       {/* Sidebar */}
//       <div className="w-80 bg-slate-900/90 backdrop-blur-md border-r border-teal-500/20 flex flex-col">
//         {/* Header */}
//         <div className="p-6 border-b border-slate-700/50">
//           <div className="flex items-center gap-3 mb-6">
//             <MessageCircle className="w-6 h-6 text-teal-400" />
//             <h1 className="text-xl font-semibold text-white">Chat Q&A</h1>
//             <div className="ml-auto w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-slate-600/50 transition-colors cursor-pointer">
//               <User className="w-4 h-4 text-slate-300" />
//             </div>
//           </div>
//           <p className="text-slate-400 text-sm">Ask your doubt freely!</p>
//         </div>

//         {/* Actions */}
//         <div className="p-4 space-y-3">
//           <Button 
//             onClick={handleNewChat}
//             className="w-full justify-start gap-3 bg-teal-500 hover:bg-teal-600 text-white font-medium"
//           >
//             <Plus className="w-4 h-4" />
//             New chat
//           </Button>
          
//           <div className="relative">
//             <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//             <Input 
//               placeholder="Search chat" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
//             />
//           </div>
//         </div>

//         {/* Previous Topics */}
//         <div className="flex-1 px-4 pb-4">
//           <h2 className="text-sm font-medium text-slate-400 mb-3">Previous Topics</h2>
//           <div className="space-y-1">
//             {chatTopics
//               .filter(topic => 
//                 searchQuery === "" || 
//                 topic.toLowerCase().includes(searchQuery.toLowerCase())
//               )
//               .map((topic, index) => (
//               <Button
//                 key={index}
//                 onClick={() => handleTopicClick(topic)}
//                 variant="ghost"
//                 className={`w-full justify-start text-left p-3 h-auto text-slate-300 hover:text-white hover:bg-teal-500/20 transition-colors ${
//                   index === 0 ? 'bg-teal-500/20 border border-teal-500/30' : ''
//                 }`}
//               >
//                 {topic}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Area */}
//         <div className="flex-1 p-6">
//           <Card className="h-full bg-slate-800/80 backdrop-blur-lg border-slate-700/50 shadow-2xl p-6 flex flex-col">
//             <h2 className="text-2xl font-semibold text-white mb-6">Ask your Question</h2>
            
//             {/* Messages */}
//             <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   {!message.isUser && (
//                     <Avatar className="w-8 h-8">
//                       <AvatarFallback className="bg-teal-500 text-white font-semibold">
//                         S
//                       </AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-md p-4 rounded-2xl ${
//                       message.isUser
//                         ? 'bg-slate-600/80 text-white shadow-lg backdrop-blur-sm'
//                         : 'bg-slate-700/60 text-white shadow-lg backdrop-blur-sm'
//                     }`}
//                   >
//                     {message.content}
//                   </div>
//                   {message.isUser && (
//                     <Avatar className="w-8 h-8">
//                       <AvatarFallback className="bg-slate-600 text-white">
//                         U
//                       </AvatarFallback>
//                     </Avatar>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex gap-3 justify-start">
//                   <Avatar className="w-8 h-8">
//                     <AvatarFallback className="bg-teal-500 text-white font-semibold">
//                       S
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="bg-slate-700/60 text-white shadow-lg backdrop-blur-sm p-4 rounded-2xl">
//                     <div className="flex space-x-2">
//                       <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
//                       <div
//                         className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       ></div>
//                       <div
//                         className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Difficulty Selector */}
//             <div className="mb-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-slate-400">Difficulty</span>
//                 <Select value={difficulty} onValueChange={setDifficulty}>
//                   <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-600">
//                     <SelectItem value="Easy" className="text-white hover:bg-slate-700">Easy</SelectItem>
//                     <SelectItem value="Medium" className="text-white hover:bg-slate-700">Medium</SelectItem>
//                     <SelectItem value="Hard" className="text-white hover:bg-slate-700">Hard</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Input Area */}
//             <div className="flex gap-3">
//               <Input
//                 placeholder="Ask your question here ..."
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSubmit();
//                   }
//                 }}
//                 disabled={loading}
//               />
//               <Button 
//                 onClick={handleSubmit}
//                 disabled={loading || !question.trim()}
//                 className="px-6 bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all duration-200"
//               >
//                 {loading ? "..." : "Generate"}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedChatInterface;



// import { useState, useRef, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { MessageCircle, Plus, Search, User, AlertTriangle } from "lucide-react";

// interface Message {
//   id: string;
//   content: string;
//   isUser: boolean;
//   timestamp: Date;
//   error?: boolean;
// }

// const chatTopics = [
//   "Photosynthesis",
//   "Light", 
//   "Respiration in Organisms",
//   "Transportation in Animals and Plants",
//   "Acids, Bases and Salts",
//   "Forests Our Lifeline",
//   "Electricity"
// ];

// export const EnhancedChatInterface = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       content: "Hello, I am here to answer, Ask me anything!",
//       isUser: false,
//       timestamp: new Date(),
//     },
//   ]);
//   const [question, setQuestion] = useState("");
//   const [difficulty, setDifficulty] = useState("Medium");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline' | 'unknown'>('unknown');
  
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);

//   // Check backend status on component mount
//   useEffect(() => {
//     checkBackendStatus();
//   }, []);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const checkBackendStatus = async () => {
//     setBackendStatus('checking');
//     try {
//       const response = await fetch("https://rag-bot-53xj.onrender.com/qa", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ question: "test" }),
//       });
      
//       if (response.ok) {
//         setBackendStatus('online');
//       } else {
//         setBackendStatus('offline');
//       }
//     } catch (error) {
//       console.error("Backend check failed:", error);
//       setBackendStatus('offline');
//     }
//   };

//   const handleSubmit = async () => {
//     if (!question.trim() || loading) return;

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: question,
//       isUser: true,
//       timestamp: new Date(),
//     };

//     setMessages(prev => [...prev, newMessage]);
//     const currentQuestion = question;
//     setQuestion("");
//     setLoading(true);

//     try {
//       // Add timeout to the fetch request
//       const controller = new AbortController();
//       const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

//       const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ 
//           question: currentQuestion,
//           difficulty: difficulty.toLowerCase() // Include difficulty if backend supports it
//         }),
//         signal: controller.signal
//       });

//       clearTimeout(timeoutId);

//       if (!res.ok) {
//         throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//       }

//       const data = await res.json();
//       console.log("Backend response:", data); // Debug log

//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: data.answer || data.response || "Sorry, I couldn't find an answer.",
//         isUser: false,
//         timestamp: new Date(),
//       };
      
//       setMessages(prev => [...prev, aiResponse]);
//       setBackendStatus('online');
      
//     } catch (err) {
//       console.error("Error:", err);
//       setBackendStatus('offline');
      
//       let errorMessage = "Sorry, I encountered an error. Please try again.";
      
//       if (err.name === 'AbortError') {
//         errorMessage = "Request timed out. The server might be slow or unavailable.";
//       } else if (err.message.includes('Failed to fetch')) {
//         errorMessage = "Cannot connect to server. Please check your internet connection.";
//       } else if (err.message.includes('HTTP')) {
//         errorMessage = `Server error: ${err.message}`;
//       }
      
//       const errorResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: errorMessage,
//         isUser: false,
//         timestamp: new Date(),
//         error: true,
//       };
//       setMessages(prev => [...prev, errorResponse]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNewChat = () => {
//     setMessages([
//       {
//         id: "1",
//         content: "Hello, I am here to answer, Ask me anything!",
//         isUser: false,
//         timestamp: new Date(),
//       },
//     ]);
//     setQuestion("");
//   };

//   const handleTopicClick = (topic: string) => {
//     setQuestion(`Tell me about ${topic}`);
//   };

//   const getStatusColor = () => {
//     switch (backendStatus) {
//       case 'online': return 'bg-green-500';
//       case 'offline': return 'bg-red-500';
//       case 'checking': return 'bg-yellow-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStatusText = () => {
//     switch (backendStatus) {
//       case 'online': return 'Backend Online';
//       case 'offline': return 'Backend Offline';
//       case 'checking': return 'Checking...';
//       default: return 'Unknown';
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
//       {/* Sidebar */}
//       <div className="w-80 bg-slate-900/90 backdrop-blur-md border-r border-teal-500/20 flex flex-col">
//         {/* Header */}
//         <div className="p-6 border-b border-slate-700/50">
//           <div className="flex items-center gap-3 mb-4">
//             <MessageCircle className="w-6 h-6 text-teal-400" />
//             <h1 className="text-xl font-semibold text-white">Chat Q&A</h1>
//             <div className="ml-auto w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-slate-600/50 transition-colors cursor-pointer">
//               <User className="w-4 h-4 text-slate-300" />
//             </div>
//           </div>
          
//           {/* Backend Status Indicator */}
//           <div className="flex items-center gap-2 mb-4">
//             <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
//             <span className="text-xs text-slate-400">{getStatusText()}</span>
//             {backendStatus === 'offline' && (
//               <Button 
//                 onClick={checkBackendStatus}
//                 variant="ghost" 
//                 size="sm"
//                 className="text-xs text-teal-400 p-1 h-auto"
//               >
//                 Retry
//               </Button>
//             )}
//           </div>
          
//           <p className="text-slate-400 text-sm">Ask your doubt freely!</p>
//         </div>

//         {/* Actions */}
//         <div className="p-4 space-y-3">
//           <Button 
//             onClick={handleNewChat}
//             className="w-full justify-start gap-3 bg-teal-500 hover:bg-teal-600 text-white font-medium"
//           >
//             <Plus className="w-4 h-4" />
//             New chat
//           </Button>
          
//           <div className="relative">
//             <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
//             <Input 
//               placeholder="Search chat" 
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
//             />
//           </div>
//         </div>

//         {/* Previous Topics */}
//         <div className="flex-1 px-4 pb-4">
//           <h2 className="text-sm font-medium text-slate-400 mb-3">Previous Topics</h2>
//           <div className="space-y-1">
//             {chatTopics
//               .filter(topic => 
//                 searchQuery === "" || 
//                 topic.toLowerCase().includes(searchQuery.toLowerCase())
//               )
//               .map((topic, index) => (
//               <Button
//                 key={index}
//                 onClick={() => handleTopicClick(topic)}
//                 variant="ghost"
//                 className={`w-full justify-start text-left p-3 h-auto text-slate-300 hover:text-white hover:bg-teal-500/20 transition-colors ${
//                   index === 0 ? 'bg-teal-500/20 border border-teal-500/30' : ''
//                 }`}
//               >
//                 {topic}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Area */}
//         <div className="flex-1 p-6">
//           <Card className="h-full bg-slate-800/80 backdrop-blur-lg border-slate-700/50 shadow-2xl p-6 flex flex-col">
//             <h2 className="text-2xl font-semibold text-white mb-6">Ask your Question</h2>
            
//             {/* Backend Error Warning */}
//             {backendStatus === 'offline' && (
//               <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-3">
//                 <AlertTriangle className="w-5 h-5 text-red-400" />
//                 <div>
//                   <p className="text-red-400 font-medium">Backend Connection Failed</p>
//                   <p className="text-red-300 text-sm">The API server is not responding. Please check if the backend is running.</p>
//                 </div>
//               </div>
//             )}
            
//             {/* Messages */}
//             <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
//                 >
//                   {!message.isUser && (
//                     <Avatar className="w-8 h-8">
//                       <AvatarFallback className={`${message.error ? 'bg-red-500' : 'bg-teal-500'} text-white font-semibold`}>
//                         {message.error ? '!' : 'S'}
//                       </AvatarFallback>
//                     </Avatar>
//                   )}
//                   <div
//                     className={`max-w-md p-4 rounded-2xl ${
//                       message.isUser
//                         ? 'bg-slate-600/80 text-white shadow-lg backdrop-blur-sm'
//                         : message.error 
//                         ? 'bg-red-500/20 border border-red-500/30 text-red-100 shadow-lg backdrop-blur-sm'
//                         : 'bg-slate-700/60 text-white shadow-lg backdrop-blur-sm'
//                     }`}
//                   >
//                     {message.content}
//                   </div>
//                   {message.isUser && (
//                     <Avatar className="w-8 h-8">
//                       <AvatarFallback className="bg-slate-600 text-white">
//                         U
//                       </AvatarFallback>
//                     </Avatar>
//                   )}
//                 </div>
//               ))}

//               {loading && (
//                 <div className="flex gap-3 justify-start">
//                   <Avatar className="w-8 h-8">
//                     <AvatarFallback className="bg-teal-500 text-white font-semibold">
//                       S
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="bg-slate-700/60 text-white shadow-lg backdrop-blur-sm p-4 rounded-2xl">
//                     <div className="flex space-x-2">
//                       <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
//                       <div
//                         className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       ></div>
//                       <div
//                         className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               )}
              
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Difficulty Selector */}
//             <div className="mb-4">
//               <div className="flex items-center gap-3">
//                 <span className="text-sm text-slate-400">Difficulty</span>
//                 <Select value={difficulty} onValueChange={setDifficulty}>
//                   <SelectTrigger className="w-32 bg-slate-700/50 border-slate-600 text-white">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-600">
//                     <SelectItem value="Easy" className="text-white hover:bg-slate-700">Easy</SelectItem>
//                     <SelectItem value="Medium" className="text-white hover:bg-slate-700">Medium</SelectItem>
//                     <SelectItem value="Hard" className="text-white hover:bg-slate-700">Hard</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             {/* Input Area */}
//             <div className="flex gap-3">
//               <Input
//                 placeholder="Ask your question here ..."
//                 value={question}
//                 onChange={(e) => setQuestion(e.target.value)}
//                 className="flex-1 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSubmit();
//                   }
//                 }}
//                 disabled={loading}
//               />
//               <Button 
//                 onClick={handleSubmit}
//                 disabled={loading || !question.trim()}
//                 className="px-6 bg-teal-500 hover:bg-teal-600 text-white font-medium transition-all duration-200 disabled:opacity-50"
//               >
//                 {loading ? "..." : "Generate"}
//               </Button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedChatInterface;



//mine final
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
            {/* <div className="mb-4">
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
            </div> */}

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
