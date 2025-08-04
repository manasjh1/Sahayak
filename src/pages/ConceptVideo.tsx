import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const ConceptVideo = () => {
    const [topic, setTopic] = useState("");
    const [showVideo, setShowVideo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [animationPhase, setAnimationPhase] = useState(0);

    const concepts = [
        { 
            id: 1, 
            title: "Heat Transformation", 
            image: "🌡️",
            gradient: "from-purple-500 to-pink-500",
            delay: "0s"
        },
        { 
            id: 2, 
            title: "Transportation in Animals", 
            image: "🐋",
            gradient: "from-blue-500 to-cyan-500",
            delay: "0.2s"
        },
        { 
            id: 3, 
            title: "Transportation in Plants", 
            image: "🌿",
            gradient: "from-green-400 to-blue-500",
            delay: "0.4s"
        },
        { 
            id: 4, 
            title: "Electricity", 
            image: "⚡",
            gradient: "from-pink-500 to-purple-600",
            delay: "0.6s"
        },
        { 
            id: 5, 
            title: "Atoms", 
            image: "⚛️",
            gradient: "from-orange-400 to-red-500",
            delay: "0.8s"
        }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setAnimationPhase(1), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = () => {
        if (!topic.trim()) return;

        const normalizedTopic = topic.toLowerCase().trim();

        if (normalizedTopic === "metal vs non-metal" ||
            normalizedTopic === "metals vs non-metals" ||
            normalizedTopic === "metal vs nonmetal") {
            setLoading(true);
            setShowVideo(false);
            setAnimationPhase(2);

            setTimeout(() => {
                setLoading(false);
                setShowVideo(true);
                setAnimationPhase(3);
            }, 8000);
        } else {
            alert("No video available for this topic yet!\n\nTry: Metal vs non-metal");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-32 left-1/3 w-28 h-28 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Beta Disclaimer */}
            <div className={`fixed top-4 right-4 z-50 transform transition-all duration-1000 ${animationPhase >= 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className="bg-orange-900/80 backdrop-blur-sm border border-orange-500/30 rounded-lg p-3 max-w-sm">
                    <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <div className="text-orange-200 text-xs">
                            <strong>Beta Phase:</strong> AI system in beta. May have occasional mistakes or crashes due to limited resources.
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
                {/* Header */}
                <div className={`text-center mb-12 transform transition-all duration-1000 ${animationPhase >= 1 ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Concept clarity in a click
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
                        Where doubts disappear and learning begins, Your smart companion for learning and teaching.
                    </p>
                </div>

                {/* Search Bar */}
                <div className={`w-full max-w-2xl mb-16 transform transition-all duration-1000 delay-300 ${animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Enter a concept to visualize..."
                            value={topic}
                            onChange={(e) => {
                                setTopic(e.target.value);
                                setShowVideo(false);
                                setLoading(false);
                                setAnimationPhase(1);
                            }}
                            onKeyPress={handleKeyPress}
                            className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                        />
                        <button
                            onClick={handleSubmit}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            Generate
                        </button>
                    </div>
                </div>

                {/* Loading Animation */}
                {loading && animationPhase === 2 && (
                    <div className="mb-8 text-center">
                        <div className="inline-flex items-center space-x-2 bg-blue-900/30 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            <span className="text-blue-200 font-medium ml-3">Generating video explanation...</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-4 w-96 mx-auto">
                            <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" 
                                     style={{
                                         width: '100%',
                                         animation: 'loading 8s linear forwards'
                                     }}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Video Player */}
                {showVideo && animationPhase === 3 && (
                    <div className="mb-12 transform transition-all duration-1000 animate-fadeIn">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                            <video
                                className="w-full max-w-2xl rounded-2xl"
                                controls
                                autoPlay
                            >
                                <source src="/video/Conduction.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none"></div>
                        </div>
                    </div>
                )}

                {/* Concept Cards */}
                <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 w-full max-w-6xl transform transition-all duration-1000 delay-500 ${animationPhase >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {concepts.map((concept, index) => (
                        <div
                            key={concept.id}
                            className={`group relative h-32 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                            style={{ 
                                animationDelay: concept.delay,
                                animation: `slideUp 0.8s ease-out ${concept.delay} both`
                            }}
                            onClick={() => setTopic(concept.title)}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${concept.gradient} opacity-80`}></div>
                            
                            {/* Glass Effect */}
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                            
                            {/* Border */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
                            
                            {/* Content */}
                            <div className="relative h-full flex flex-col items-center justify-center text-center p-4">
                                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {concept.image}
                                </div>
                                <h3 className="text-white font-semibold text-sm leading-tight">
                                    {concept.title}
                                </h3>
                            </div>
                            
                            {/* Hover Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>

            <style >{`
                @keyframes loading {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                
                @keyframes fadeIn {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default ConceptVideo;