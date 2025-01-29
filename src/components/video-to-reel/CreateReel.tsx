import React, { useState } from 'react';
import { FiType, FiClock, FiHash, FiGlobe, FiLayout, FiMessageCircle, FiEdit } from 'react-icons/fi';
import axios from 'axios';
import { ReelResults } from './ReelResults';
import Cookies from 'js-cookie';
import { Video } from '../../types/trends';

interface CreateReelProps {
  projectName: string;
  videoUrl: string;
  language: string;
  reelLength: string;
  addSubtitles: boolean;
  addHeadline: boolean;
  numberOfClips: number;
  keywords: string;
  onBack: () => void;
  onGenerate: (projectId: number) => void;
}

// Language mapping based on the documentation
const languageMap: { [key: string]: string } = {
  'English': 'en',
  'Arabic (عربي)': 'ar',
  'Bulgarian (български)': 'bg',
  'Croatian (Hrvatski)': 'hr',
  'Czech (čeština)': 'cs',
  'Danish (Dansk)': 'da',
  'Dutch (Nederlands)': 'nl',
  'Finnish (Suomi)': 'fi',
  'French (Français)': 'fr',
  'German (Deutsch)': 'de',
  'Greek(Ελληνικά)': 'el',
  'Hebrew (עברית)': 'iw',
  'Hindi (हिंदी)': 'hi',
  'Hungarian (Magyar nyelv)': 'hu',
  'Indonesian (Bahasa Indonesia)': 'id',
  'Italian (Italiano)': 'it',
  'Japanese (日本語)': 'ja',
  'Korean (한국어)': 'ko',
  'Lithuanian (Lietuvių kalba)': 'lt',
  'Malay (Melayu)': 'mal',
  'Mandarin - Simplified (普通话-简体)': 'zh',
  'Mandarin - Traditional (國語-繁體)': 'zh-TW',
  'Norwegian (Norsk)': 'no',
  'Polish (Polski)': 'pl',
  'Portuguese (Português)': 'pt'
};

// Map reel length to preferLength array value
const reelLengthMap: { [key: string]: number } = {
  'Auto': 0,
  'Less than 30s': 1,
  '30s to 60s': 2,
  '60s to 90s': 3,
  '90s to 3min': 4
};


const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-6 max-w-sm w-full mx-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-100 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-t-indigo-500 animate-spin rounded-full absolute top-0"></div>
        <div className="w-16 h-16 border-4 border-l-pink-500 animate-[spin_3s_linear_infinite] rounded-full absolute top-0"></div>
      </div>
      
      <div className="space-y-2 text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Generating Your Clips
        </h3>
        <p className="text-gray-500">Please wait, it might take up to 5mins</p>
      </div>

      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-300 animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  </div>
);

const isYouTubeOrGoogleDriveUrl = (url: string): boolean => {
  return url.includes('youtube.com') || 
         url.includes('youtu.be') || 
         url.includes('drive.google.com');
};

const isBlobUrl = (url: string): boolean => {
  return url.startsWith('blob:');
};

export const CreateReel: React.FC<CreateReelProps> = ({
  projectName,
  videoUrl,
  language,
  reelLength,
  addSubtitles,
  addHeadline,
  numberOfClips,
  keywords,
  onBack,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<Video[] | null>(null);

  const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
    try {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String.split(',')[1]); // Remove the data URL prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error('Failed to convert blob to base64');
    }
  };

  const getProcessedVideoUrl = async (originalUrl: string): Promise<string> => {
    if (isYouTubeOrGoogleDriveUrl(originalUrl)) {
      return originalUrl;
    }

    try {
      let base64String;
      if (isBlobUrl(originalUrl)) {
        base64String = await convertBlobToBase64(originalUrl);
      } else {
        return originalUrl; // Return as is if it's already a regular URL
      }

      const response = await axios.post(
        'https://marketing-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/generate_url_for_video',
        { b64_string: base64String }
      );

      if (response.data) {
        return response.data;
      } else {
        throw new Error('Failed to generate video URL');
      }
    } catch (error) {
      throw new Error('Failed to process video URL');
    }
  };

  const pollProjectStatus = async (projectId: number, attempt = 1) => {
    const maxAttempts = 100;
    const baseDelay = 3000;
    const maxDelay = 15000;
  
    try {
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }
      const response = await axios.get(
        `https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/poll_project/${projectId}`,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 100000
        });
      
      if (response.data.code === 2000 && response.data.videos) {
        // Transform the API response to match the Video interface
        const transformedVideos: Video[] = response.data.videos.map((video: any) => ({
          ...video,
          viralScore: video.viralScore || null,
          relatedTopic: video.relatedTopic ? video.relatedTopic.split(',').map((t: string) => t.trim()) : null,
          transcript: video.transcript || null,
          title: video.title || null,
          viralReason: video.viralReason || null
        }));
        
        setVideos(transformedVideos);
        setIsGenerating(false);
      } else if (attempt < maxAttempts) {
        const delay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), maxDelay);
        console.log(`Polling attempt ${attempt} failed, retrying in ${delay}ms`);
        setTimeout(() => pollProjectStatus(projectId, attempt + 1), delay);
      } else {
        throw new Error('Maximum polling attempts reached');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        // Handle timeout specifically
        if (attempt < maxAttempts) {
          const delay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), maxDelay);
          console.log(`Request timed out, retrying in ${delay}ms`);
          setTimeout(() => pollProjectStatus(projectId, attempt + 1), delay);
        } else {
          setError('Project status check timed out. Please refresh the page.');
          setIsGenerating(false);
        }
      } else {
        console.error('Error polling project status:', error);
        setError('Failed to get project status. Please refresh the page.');
        setIsGenerating(false);
      }
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
  
    try {
      // Process the video URL first
      const processedVideoUrl = await getProcessedVideoUrl(videoUrl);
  
      // Determine videoType based on URL
      let videoType = 1; // default to 1
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        videoType = 2; // YouTube
      } else if (videoUrl.includes('drive.google.com')) {
        videoType = 3; // Google Drive
      }
  
      const payload = {
        lang: languageMap[language] || 'en',
        videoUrl: processedVideoUrl,
        ext: 'mp4',
        preferLength: [reelLengthMap[reelLength] || 0],
        projectName,
        subtitleSwitch: addSubtitles ? 1 : 0,
        headlineSwitch: addHeadline ? 1 : 0,
        videoType, // dynamically set videoType
        maxClipNumber: numberOfClips,
        keywords: keywords
      };
      
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }
  
      const response = await axios.post(
        'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/create_project',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });
  
      if (response.data.code === 2000 && response.data.projectId) {
        console.log(response.data.projectId)
        pollProjectStatus(response.data.projectId);
      } else {
        throw new Error('Failed to create project');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      setIsGenerating(false);
    }
  };

  if (videos) {
    return <ReelResults videos={videos} onBack={() => setVideos(null)} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {isGenerating && <LoadingAnimation />}
      
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
            Create Reel
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Project Settings</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiEdit className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Project Name</span>
                </div>
                <p className="font-medium text-indigo-900">{projectName}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiGlobe className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Language</span>
                </div>
                <p className="font-medium text-indigo-900">{language}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiClock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Reel Length</span>
                </div>
                <p className="font-medium text-indigo-900">{reelLength}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiLayout className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Number of Clips</span>
                </div>
                <p className="font-medium text-indigo-900">{numberOfClips}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiType className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Subtitles</span>
                </div>
                <p className="font-medium text-indigo-900">{addSubtitles ? 'Yes' : 'No'}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <FiMessageCircle className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-indigo-600">Headline</span>
                </div>
                <p className="font-medium text-indigo-900">{addHeadline ? 'Yes' : 'No'}</p>
              </div>
              {keywords && (
                <div className="col-span-2 space-y-1">
                  <div className="flex items-center space-x-2">
                    <FiHash className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-indigo-600">Keywords</span>
                  </div>
                  <p className="font-medium text-indigo-900">{keywords}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            disabled={isGenerating}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors shadow-lg shadow-indigo-500/25 disabled:opacity-50"
          >
            Generate Clips
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReel;