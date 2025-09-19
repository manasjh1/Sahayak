import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, Plus, Search, User, AlertTriangle } from "lucide-react";

const WorksheetGenerator = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [worksheet, setWorksheet] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline' | 'unknown'>('unknown');
  
  const worksheetEndRef = useRef<HTMLDivElement | null>(null);

  const sampleTopics = [
    "Photosynthesis",
    "Light", 
    "Respiration in Organisms",
    "Transportation in Animals and Plants",
    "Acids, Bases and Salts",
    "Forests Our Lifeline",
    "Electricity"
  ];

  // Auto-scroll to bottom when worksheet updates
  useEffect(() => {
    if (worksheetEndRef.current && worksheet) {
      worksheetEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [worksheet]);

  // Check backend status on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setBackendStatus('checking');
    try {
      const response = await fetch("https://rag-bot-53xj.onrender.com/worksheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          msg: "test",
          difficulty: "Easy"
        }),
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
    if (!topic.trim() || loading) return;

    setLoading(true);
    setWorksheet("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const res = await fetch("https://rag-bot-53xj.onrender.com/worksheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          msg: topic.trim(),
          difficulty: difficulty
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Backend response:", data);

      setWorksheet(data.worksheet || "Sorry, I couldn't generate a worksheet for this topic.");
      setBackendStatus('online');
      
    } catch (err) {
      console.error("Error:", err);
      setBackendStatus('offline');
      
      let errorMessage = "Sorry, I encountered an error generating the worksheet.";
      
      if (err.name === 'AbortError') {
        errorMessage = "Request timed out. The server might be slow or unavailable.";
      } else if (err.message.includes('Failed to fetch')) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (err.message.includes('HTTP')) {
        errorMessage = `Server error: ${err.message}`;
      }
      
      setWorksheet(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleNewWorksheet = () => {
    setWorksheet("");
    setTopic("");
  };

  const handleTopicClick = (selectedTopic: string) => {
    setTopic(selectedTopic);
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
            <FileText className="w-6 h-6 text-teal-400" />
            <h1 className="text-xl font-semibold text-white">Worksheet Generator</h1>
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
          
          <p className="text-slate-400 text-sm">Create custom worksheets!</p>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <Button 
            onClick={handleNewWorksheet}
            className="w-full justify-start gap-3 bg-teal-500 hover:bg-teal-600 text-white font-medium"
          >
            <Plus className="w-4 h-4" />
            New worksheet
          </Button>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search topics" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-teal-400/50 focus:ring-teal-400/20"
            />
          </div>
        </div>

        {/* Sample Topics */}
        <div className="flex-1 px-4 pb-4">
          <h2 className="text-sm font-medium text-slate-400 mb-3">Sample Topics</h2>
          <div className="space-y-1">
            {sampleTopics
              .filter(topic => 
                searchQuery === "" || 
                topic.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((sampleTopic, index) => (
              <Button
                key={index}
                onClick={() => handleTopicClick(sampleTopic)}
                variant="ghost"
                className={`w-full justify-start text-left p-3 h-auto text-slate-300 hover:text-white hover:bg-teal-500/20 transition-colors ${
                  index === 0 ? 'bg-teal-500/20 border border-teal-500/30' : ''
                }`}
              >
                {sampleTopic}
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
            <h2 className="text-2xl font-semibold text-white mb-6">Generate Your Worksheet</h2>
            
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
            
            {/* Worksheet Display */}
            <div className="flex-1 mb-6 space-y-4 overflow-y-auto">
              {worksheet && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-teal-500 text-white font-semibold">
                      W
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-full p-4 rounded-2xl bg-slate-700/60 text-white shadow-lg backdrop-blur-sm">
                    <pre className="whitespace-pre-wrap font-sans text-sm">{worksheet}</pre>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-teal-500 text-white font-semibold">
                      W
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
              
              <div ref={worksheetEndRef} />
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
                placeholder="Enter topic for worksheet (e.g., Photosynthesis)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
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
                disabled={loading || !topic.trim()}
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

export default WorksheetGenerator;