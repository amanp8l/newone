    import React from 'react';
    import { FiArrowLeft, FiDownload, FiShare2 } from 'react-icons/fi';
    import { motion } from 'framer-motion';

    interface Video {
    viralScore: string;
    relatedTopic: string;
    transcript: string;
    videoUrl: string;
    videoMsDuration: number;
    videoId: number;
    title: string;
    viralReason: string;
    }

    interface ReelResultsProps {
    videos: Video[];
    onBack: () => void;
    }

    export const ReelResults: React.FC<ReelResultsProps> = ({ videos, onBack }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
            <button
                onClick={onBack}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
                <FiArrowLeft className="w-4 h-4" />
                <span>Back to Settings</span>
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
                <motion.div
                key={video.videoId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden"
                >
                <div className="aspect-video relative">
                    <video
                    src={video.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    {Math.floor(video.videoMsDuration / 1000)}s
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full">
                        <span className="text-white text-sm font-medium">
                            Viral Score: {video.viralScore}/10
                        </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600">
                        <FiDownload className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-600">
                        <FiShare2 className="w-5 h-5" />
                        </button>
                    </div>
                    </div>

                    <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                    {video.title}
                    </h3>

                    <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-indigo-900 mb-1">Transcript</h4>
                        <p className="text-indigo-600 text-sm">{video.transcript}</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-medium text-indigo-900 mb-1">Why It's Viral</h4>
                        <p className="text-indigo-600 text-sm">{video.viralReason}</p>
                    </div>

                    {video.relatedTopic && video.relatedTopic !== '[]' && (
                        <div>
                        <h4 className="text-sm font-medium text-indigo-900 mb-1">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {JSON.parse(video.relatedTopic).map((topic: string, i: number) => (
                            <span
                                key={i}
                                className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-full text-sm text-indigo-600"
                            >
                                {topic}
                            </span>
                            ))}
                        </div>
                        </div>
                    )}
                    </div>
                </div>
                </motion.div>
            ))}
            </div>
        </div>
        </div>
    );
    };