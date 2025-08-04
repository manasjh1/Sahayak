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



import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Search, Edit, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorksheetMessage {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WorksheetGenerator = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [messages, setMessages] = useState<WorksheetMessage[]>([
    {
      id: 1,
      type: "assistant",
      content: "Hello, I am here to answer, Ask me anything!",
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: WorksheetMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://rag-bot-53xj.onrender.com/worksheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ question: inputMessage }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: WorksheetMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: data.answer || "Sorry, I couldn't generate a worksheet.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "Failed to get a response from the server.",
      });

      const errorMessage: WorksheetMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const chatTopics = [
    "Math Problems",
    "Light",
    "Reading Comprehension",
    "Grammar Exercises",
    "Science Worksheets",
    "Forests Our Lifeline",
    "Electricity",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#11545B] to-[#5529A9] text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-80 bg-[#000000]/20 backdrop-blur-md border-r border-[#11545B]/30">
          <div className="p-6 border-b border-[#11545B]/30"></div>

          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white/90 mb-4">
              Previous Topics
            </h2>

            <div className="space-y-3 mb-6">
              <button className="flex items-center space-x-3 w-full p-3 text-left text-[#46F1E0] hover:text-white hover:bg-[#11545B]/20 rounded-lg transition-all duration-200 border border-[#11545B]/30">
                <Edit className="h-4 w-4" />
                <span className="text-sm">New chat</span>
              </button>
              <button className="flex items-center space-x-3 w-full p-3 text-left text-[#46F1E0] hover:text-white hover:bg-[#11545B]/20 rounded-lg transition-all duration-200 border border-[#11545B]/30">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search chat</span>
              </button>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#46F1E0]/70 mb-3">
                Chats
              </h3>
              <div className="space-y-2">
                {chatTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 rounded-lg bg-[#11545B]/20 hover:bg-[#11545B]/40 text-sm text-white/90 transition-all duration-200 border border-[#11545B]/40"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="bg-[#14273F] border-b border-white/20 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-10 w-10 text-white" />
              <div>
                <h1 className="text-lg font-semibold text-white">Generate Your Worksheet</h1>
                <p className="text-sm text-slate-300">Generate custom worksheets easily!</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200 backdrop-blur-sm">
              <User className="h-5 w-5 text-white/80" />
            </button>
          </header>

          {/* Chat Content */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-7 border border-white/70 shadow-xl flex flex-col h-[550px]">
                <h2 className="text-3xl font-semibold text-white mb-2">
                 Worksheet Generator
                </h2>

                {/* Messages Area */}
                <div className="flex-1 bg rounded-2xl p-4 h-[350px] overflow-y-auto mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="mb-4">
                      {message.type === "assistant" && (
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-white">
                              🤖
                            </span>
                          </div>
                          <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-4 max-w-lg border border-white/40">
                            <p className="text-sm text-[#000000]">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      )}
                      {message.type === "user" && (
                        <div className="flex justify-end mb-6">
                          <div className="bg-[#5529A9]/80 backdrop-blur-sm rounded-2xl rounded-tr-sm px-5 py-4 max-w-lg border border-white/30">
                            <p className="text-sm text-white">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">🤖</span>
                      </div>
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-sm px-5 py-4 border border-white/40">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#11545B] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 👇 Auto scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
                 {/* Difficulty Selector */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3">
                    <label className="text-sm text-white/80">Difficulty</label>
                    <div className="relative">
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-36 bg-white/90 backdrop-blur-sm text-[#000000] rounded-xl px-5 py-1 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/40"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#11545B] pointer-events-none" />
                    </div>
                  </div>
                </div>


               
                {/* Input Area */}
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Generate your worksheet here ..."
                    className="flex-1 bg-white/90 backdrop-blur-sm text-[#000000] placeholder-[#11545B]/60 rounded-xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 border border-white/40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={loading}
                  />
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={loading || !inputMessage.trim()}
                    className="bg-[#000000]/80 backdrop-blur-sm hover:bg-[#000000]/90 text-white border border-white/40 px-10 py-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-white/10"
                  >
                    {loading ? "..." : "Generate"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorksheetGenerator;
  