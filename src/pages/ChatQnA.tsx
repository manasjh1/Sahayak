import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatQnA = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm here to answer your questions. Ask me anything!",
      timestamp: new Date(),
    },
  ]);

  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const res = await fetch("https://rag-bot-53xj.onrender.com/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: inputMessage }),
      });

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: data.response || "Sorry, I couldn’t find an answer.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to get a response from the server.",
      });
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Chat QnA</h1>
              <p className="text-sm text-muted-foreground">Ask your doubts freely!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 px-4 py-6 hidden md:block">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Previous Topics</h2>
          <div className="space-y-3">
            {[
              "Math Doubts",
              "Science Explanation",
              "JavaScript Tips",
              "Python Basics",
            ].map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Chat Section */}
        <main className="flex-1 px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Ask Your Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Messages */}
                <div className="bg-muted/30 rounded-lg p-4 h-96 overflow-y-auto overflow-x-hidden space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground ml-4"
                            : "bg-white text-foreground mr-4 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.type === "assistant" && <Bot className="h-5 w-5 mt-0.5 text-primary" />}
                          {message.type === "user" && <User className="h-5 w-5 mt-0.5 text-primary-foreground" />}
                          <div>
                            <p className="text-sm font-medium mb-1">
                              {message.type === "assistant" ? "Answer" : "You"}
                            </p>
                            <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask your question here..."
                      className="flex-1 resize-none p-3 border border-input rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-20 overflow-y-auto"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage} className="px-6">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatQnA;
