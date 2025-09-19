import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FileText, Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorksheetGenerator = () => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [loading, setLoading] = useState(false);
  const [worksheet, setWorksheet] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const suggestedTopics = [
    "Photosynthesis",
    "Light and Reflection", 
    "Respiration in Organisms",
    "Transportation in Animals and Plants",
    "Acids, Bases and Salts",
    "Forests Our Lifeline",
    "Electricity",
    "Force and Motion",
    "Sound",
    "Chemical Reactions"
  ];

  const handleSubmit = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError("");
    setWorksheet("");

    try {
      // Create FormData as your backend expects Form data
      const formData = new FormData();
      formData.append('msg', topic);
      formData.append('difficulty', difficulty);

      console.log('Sending worksheet request:', topic, difficulty);

      const response = await fetch("https://rag-bot-53xj.onrender.com/worksheet", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Worksheet response:", data);

      if (data.worksheet) {
        setWorksheet(data.worksheet);
      } else {
        setError("No worksheet content received");
      }

    } catch (err) {
      console.error("Worksheet generation error:", err);
      setError("Failed to generate worksheet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (suggestedTopic) => {
    setTopic(suggestedTopic);
  };

  const downloadWorksheet = () => {
    if (!worksheet) return;
    
    const element = document.createElement("a");
    const file = new Blob([worksheet], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic.replace(/\s+/g, '_')}_${difficulty}_worksheet.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-teal-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Worksheet Generator</h1>
              <p className="text-slate-300">Create custom educational worksheets</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-lg border-slate-700/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Generate Worksheet</h2>
              
              {/* Topic Input */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Topic
                  </label>
                  <Input
                    placeholder="Enter topic (e.g., Photosynthesis)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit();
                      }
                    }}
                  />
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Difficulty Level
                  </label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
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

              {/* Generate Button */}
              <Button 
                onClick={handleSubmit}
                disabled={loading || !topic.trim()}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium mb-6"
              >
                {loading ? "Generating..." : "Generate Worksheet"}
              </Button>

              {/* Suggested Topics */}
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Suggested Topics</h3>
                <div className="space-y-2">
                  {suggestedTopics.map((suggestedTopic, index) => (
                    <Button
                      key={index}
                      onClick={() => handleTopicClick(suggestedTopic)}
                      variant="ghost"
                      className="w-full justify-start text-left text-slate-300 hover:text-white hover:bg-slate-700/50 text-sm"
                    >
                      {suggestedTopic}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-lg border-slate-700/50 p-6 min-h-[600px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Generated Worksheet</h2>
                {worksheet && (
                  <Button
                    onClick={downloadWorksheet}
                    variant="outline"
                    className="text-white border-slate-600 hover:bg-slate-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 text-teal-400 mb-4">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <p className="text-slate-300">Generating your worksheet...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-4">
                  <p className="text-red-300">{error}</p>
                </div>
              )}

              {/* Worksheet Content */}
              {worksheet && !loading && (
                <div className="bg-slate-700/30 rounded-lg p-6">
                  <pre className="text-slate-100 whitespace-pre-wrap text-sm leading-relaxed">
                    {worksheet}
                  </pre>
                </div>
              )}

              {/* Empty State */}
              {!worksheet && !loading && !error && (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 mb-2">No worksheet generated yet</p>
                    <p className="text-slate-500 text-sm">Enter a topic and click "Generate Worksheet" to get started</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetGenerator