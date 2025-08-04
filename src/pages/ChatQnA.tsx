import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, User, Search, Edit, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatQnA = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [messages, setMessages] = useState<ChatMessage[]>([
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

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
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

      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: data.answer || "Sorry, I couldn't find an answer.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "Failed to get a response from the server.",
      });

      const errorMessage: ChatMessage = {
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
    "Photosynthesis",
    "Light",
    "Respiration in Organisms",
    "Transportation in Animals and Plants",
    "Acids, Bases and Salts",
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
                <h1 className="text-lg font-semibold text-white">Chat Q&A</h1>
                <p className="text-sm text-slate-300">Ask your doubt freely!</p>
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
                  Ask your Question
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

               
                {/* Input Area */}
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask your question here ..."
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

export default ChatQnA;
