    import React from 'react';
    import { FiThumbsUp } from 'react-icons/fi';
    import {VideoEditor} from './VideoEditor';

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

    export const ReelResults: React.FC<ReelResultsProps> = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = React.useState(videos[0]);
    const [editMode, setEditMode] = React.useState(false);

    const getTopics = (topicString: string): string[] => {
        return topicString.split(',').map(topic => topic.trim());
    };

    const handleExport = async () => {
        try {
        const response = await fetch(selectedVideo.videoUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedVideo.title}.mp4`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        } catch (error) {
        console.error('Error downloading video:', error);
        }
    };

    const handleVideoEditor = () => {
        setEditMode(true);
    };

    return (
        editMode ? <VideoEditor selectedURL={selectedVideo.videoUrl} setEditMode={setEditMode} />
        :
        (<div className="h-screen bg-gray-50 overflow-hidden">
        <div className="grid grid-cols-[260px_1fr_320px] gap-4 p-4 h-full">
            {/* Left Sidebar - Scrollable */}
            <div className="overflow-y-auto h-full pr-2">
            <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                <span className="px-3 py-1 rounded-full border border-gray-200 text-gray-600">9:16</span>
                <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600">
                    <FiThumbsUp className="w-4 h-4" />
                </button>
                </div>
                
                {videos.map((video, index) => (
                <div
                    key={video.videoId}
                    onClick={() => setSelectedVideo(video)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden ${
                    selectedVideo.videoId === video.videoId ? 'ring-2 ring-indigo-500' : ''
                    }`}
                >
                    <div className="aspect-[16/9] bg-gray-100">
                    <video
                        src={video.videoUrl}
                        className="w-full h-full object-cover"
                    />
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded text-xs text-gray-600">
                    {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-0.5 rounded text-xs text-gray-600">
                    00:{String(Math.floor(video.videoMsDuration / 1000)).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 rounded text-xs px-1.5 py-0.5 text-gray-600">
                    ★ {(Math.random() * 2 + 7).toFixed(1)}
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* Main Content - Not Scrollable */}
            <div className="flex flex-col h-full">
            <div className="mt-4 flex justify-between">
                <button 
                onClick={handleExport}
                className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 text-gray-700 border border-gray-200"
                >
                Export
                </button>
                <button className="px-4 py-2 bg-white rounded-lg hover:bg-gray-50 text-gray-700 border border-gray-200"
                onClick={handleVideoEditor}>
                Edit
                </button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center h-full">
                <div className="aspect-[9/16] w-full max-w-[400px] relative">
                <video
                    src={selectedVideo.videoUrl}
                    controls
                    className="absolute inset-0 w-full h-full object-contain"
                />
                </div>
            </div>
            </div>

            {/* Right Sidebar - Scrollable */}
            <div className="overflow-y-auto h-full pl-2">
            <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">{selectedVideo.title}</h2>
                <div className="flex items-center space-x-2 mb-4">
                    <div className="text-purple-600">
                    ✦ Viral Score
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                    {selectedVideo.viralScore}<span className="text-sm text-gray-400">/10</span>
                    </div>
                </div>
                <div className="text-sm text-gray-600">
                    {selectedVideo.viralReason}
                </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2 text-gray-800">Related topic</h3>
                <div className="flex flex-wrap gap-2">
                    {getTopics(selectedVideo.relatedTopic).map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-50 rounded-full text-sm text-gray-600">
                        {tag}
                    </span>
                    ))}
                </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-2 text-gray-800">Transcript</h3>
                <p className="text-sm text-gray-600">
                    {selectedVideo.transcript}
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>)
    );
    };

    export default ReelResults;