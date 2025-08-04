import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, User, Bot } from "lucide-react";

interface WorksheetMessage {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WorksheetGenerator = () => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<WorksheetMessage[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm here to generate worksheets for you. Describe the type of worksheet you need!",
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: WorksheetMessage = {
      id: messages.length + 1,
      type: "user",
      content: `${inputMessage} (${difficulty})`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setLoading(true);

    try {
      // Create FormData instead of JSON
      const formData = new FormData();
      formData.append('msg', inputMessage);
      formData.append('difficulty', difficulty);

      const res = await fetch("https://rag-bot-53xj.onrender.com/worksheet", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const assistantMessage: WorksheetMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: data.worksheet || "Sorry, I couldn't generate a worksheet.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error:", err);
      const errorMessage: WorksheetMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: "Sorry, I couldn't generate a worksheet. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Worksheet Generator</h1>
              <p className="text-sm text-muted-foreground">Generate custom worksheets easily!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 px-4 py-6 hidden md:block">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Worksheet Types</h2>
          <div className="space-y-3">
            {[
              "Math Problems",
              "Reading Comprehension", 
              "Grammar Exercises",
              "Science Worksheets",
            ].map((item, index) => (
              <button
                key={index}
                className="w-full text-left px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 transition-all"
                onClick={() => setInputMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Worksheet Generation Section */}
        <main className="flex-1 px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-foreground">Generate Your Worksheet</CardTitle>
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
                              {message.type === "assistant" ? "Generated" : "You"}
                            </p>
                            <p className="text-sm break-words whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-foreground mr-4 shadow-sm rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-5 w-5 text-primary" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="text-sm font-medium">Difficulty:</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex space-x-2">
                    <textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Describe your worksheet requirements here..."
                      className="flex-1 resize-none p-3 border border-input rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-20 overflow-y-auto"
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
                      className="px-6"
                      disabled={loading || !inputMessage.trim()}
                    >
                      {loading ? "Generating..." : "Generate"}
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

export default WorksheetGenerator;
