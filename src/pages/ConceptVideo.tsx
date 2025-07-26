import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const ConceptVideo = () => {
    const [topic, setTopic] = useState("");
    const [showVideo, setShowVideo] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!topic.trim()) return;

        const normalizedTopic = topic.toLowerCase().trim();

        // Handle multiple ways users might type this
        if (normalizedTopic === "metal vs non-metal" || 
            normalizedTopic === "metals vs non-metals" ||
            normalizedTopic === "metal vs nonmetal") {
            setLoading(true);
            setShowVideo(false);

            setTimeout(() => {
                setLoading(false);
                setShowVideo(true);
            }, 8000);
        } else {
            alert("No video available for this topic yet!\n\nTry: Metal vs non-metal");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
            {/* Beta Disclaimer - Above everything */}
            <Alert className="w-full max-w-md mb-6 border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800 text-sm">
                    <strong>Beta Phase:</strong> This AI system is currently in beta. There may be occasional mistakes or inaccuracies in the generated content. The system may sometimes crash or not work due to limited resources. Please verify important information and try again if it doesn't work.
                </AlertDescription>
            </Alert>

            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">🎬 Visualize a Concept</h2>
                <Input
                    type="text"
                    placeholder="e.g., Metal vs non-metal"
                    value={topic}
                    onChange={(e) => {
                        setTopic(e.target.value);
                        setShowVideo(false);
                        setLoading(false);
                    }}
                    className="mb-4"
                />
                <Button onClick={handleSubmit} className="w-full">
                    Generate Video Explanation
                </Button>
            </div>

            {loading && (
                <p className="mt-6 text-blue-600 font-semibold text-lg animate-pulse">
                    Generating video explanation...
                </p>
            )}

            {showVideo && (
                <video
                    className="mt-6 rounded-lg shadow-lg w-full max-w-md"
                    controls
                    autoPlay
                >
                    <source src="/video/Conduction.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};

export default ConceptVideo;
