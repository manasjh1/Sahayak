import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ConceptVideo = () => {
    const [topic, setTopic] = useState("");
    const [showVideo, setShowVideo] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!topic.trim()) return;

        const normalizedTopic = topic.toLowerCase().trim();

        if (normalizedTopic === "Metal vs non-metal") {
            setLoading(true);
            setShowVideo(false);

            // Generate random delay between 3000ms (3s) and 5000ms (5s)
            const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

            setTimeout(() => {
                setLoading(false);
                setShowVideo(true);
            }, delay);
        } else {
            alert("No video available for this topic yet!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
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
