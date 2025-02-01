import React, { useState } from 'react';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import { AgentModal } from './ai-playground/AgentModal';
import { useThemeStore } from '../store/themeStore';

type AgentType = 'ask-ai' | 'youtube-video' | 'linkedin-style' | 'image-upload';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  rating?: number;
  comingSoon?: boolean;
  onClick?: () => void;
  type?: AgentType;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  image, 
  difficulty = 'Easy',
  rating = 4.8,
  comingSoon = false,
  onClick
}) => {
  const { isDark } = useThemeStore();
  
  return (
    <div 
      className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-sm transition-all duration-300 group ${
        !comingSoon ? 'hover:shadow-md cursor-pointer' : 'opacity-75'
      }`}
      onClick={!comingSoon ? onClick : undefined}
    >
      <div className="p-5">
        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          {comingSoon ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full text-white font-medium animate-pulse">
                Coming Soon
              </div>
            </div>
          ) : (
            <div className="absolute top-3 right-3">
              <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                <FiArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
              {difficulty}
            </span>
            <div className="flex items-center space-x-1 text-yellow-400">
              <FiStar className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-indigo-900'}`}>{title}</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-indigo-600/80'} text-sm leading-relaxed`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<AgentType | null>(null);
  const { isDark } = useThemeStore();

  const features: (FeatureCardProps & { type?: AgentType })[] = [
    {
      title: 'Ask AI to Write',
      description: 'Transform your ideas into engaging social media content with AI-powered analysis.',
      image: 'https://media.istockphoto.com/id/1503223319/photo/ai-chat-is-bot-to-smart-and-hitech-to-communicate-with-human-ai-connection-to-global-cyber.jpg?s=612x612&w=0&k=20&c=pcyg1aWSzTxwgpPjdT9bZ4LPLq8VydhAckSBJAtzXsI=',
      difficulty: 'Beginner',
      rating: 4.9,
      type: 'ask-ai'
    },
    {
      title: 'Create from Youtube Video',
      description: 'Convert YouTube videos into compelling social media posts.',
      image: 'https://images.unsplash.com/photo-1650371471800-aa496564acba?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      difficulty: 'Intermediate',
      rating: 4.8,
      type: 'youtube-video'
    },
    {
      title: 'Copy Linkedin Style',
      description: 'Analyze and replicate successful LinkedIn content styles.',
      image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Easy',
      rating: 4.7,
      type: 'linkedin-style'
    },
    {
      title: 'Create from Images',
      description: 'Generate captivating content from your images using advanced AI analysis.',
      image: 'https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      difficulty: 'Advanced',
      rating: 4.9,
      type: 'image-upload'
    },
    {
      title: 'Create from Videos',
      description: 'Transform your videos into engaging social media content automatically.',
      image: 'https://images.unsplash.com/photo-1719937051124-91c677bc58fc?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Advanced',
      rating: 5.0,
      comingSoon: true
    },
    {
      title: 'Create from Voice',
      description: 'Convert voice recordings into compelling social media posts.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Advanced',
      rating: 5.0,
      comingSoon: true
    }
  ];

  return (
    <div className="h-screen overflow-hidden">
      <div className={`p-4 sm:p-6 lg:p-8 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 to-pink-50'} h-full`}>
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            AI Agents
          </h1>
          <p className={`text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-indigo-600'}`}>
            A Comprehensive Suite of Advanced Tools for Social Media Content Creation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto h-[calc(100%-5rem)] pb-6">
          {features.map((feature) => (
            <FeatureCard 
              key={feature.title} 
              {...feature} 
              onClick={() => !feature.comingSoon && feature.type && setSelectedAgent(feature.type)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedAgent && (
          <AgentModal
            agentType={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};