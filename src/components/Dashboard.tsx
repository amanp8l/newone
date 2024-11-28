import React, { useState } from 'react';
import { FiArrowUpRight, FiClock, FiStar, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  estimatedTime?: string;
  rating?: number;
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  image, 
  difficulty = 'Easy',
  estimatedTime = '5-10 min',
  rating = 4.8,
  onClick
}) => (
  <div 
    onClick={onClick}
    className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden"
  >
    <div className="p-5">
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-lg shadow-lg backdrop-blur-sm">
            <FiArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
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
        <h3 className="text-xl font-semibold text-indigo-900">{title}</h3>
        <p className="text-indigo-600/80 text-sm leading-relaxed">{description}</p>
        <div className="flex items-center text-indigo-500 text-sm">
          <FiClock className="w-4 h-4 mr-1" />
          <span>{estimatedTime}</span>
        </div>
      </div>
    </div>
  </div>
);

const ComingSoonModal: React.FC<{ isOpen: boolean; onClose: () => void; feature: string }> = ({ 
  isOpen, 
  onClose,
  feature 
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl p-8 max-w-lg w-full relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-pink-500" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-indigo-400" />
          </button>

          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl flex items-center justify-center relative">
              <FiClock className="w-10 h-10 text-indigo-600" />
              <div className="absolute -right-2 -top-2">
                <span className="flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
                {feature} Coming Soon
              </h2>
              <p className="text-indigo-600">
                We're working hard to bring you this exciting feature. Stay tuned for updates!
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-pink-50 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-indigo-600 text-sm">In Development</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const Dashboard: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    {
      title: 'Create From Images',
      description: 'Upload images and let our AI analyze them to generate engaging social media content.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Beginner',
      estimatedTime: '3-5 min',
      rating: 4.9
    },
    {
      title: 'Ask AI to Write',
      description: 'Get AI-powered content creation tailored to your brand voice and marketing objectives.',
      image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Intermediate',
      estimatedTime: '5-10 min',
      rating: 4.8
    },
    {
      title: 'Create From News',
      description: 'Stay relevant with AI-generated posts based on the latest industry news and trends.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Easy',
      estimatedTime: '2-4 min',
      rating: 4.7
    },
    {
      title: 'Create From Google Search',
      description: "Transform popular searches into engaging content that answers your audience's questions.",
      image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Advanced',
      estimatedTime: '8-12 min',
      rating: 4.9
    },
    {
      title: 'Create From Holidays',
      description: 'Never miss a holiday with our AI-powered seasonal content generator.',
      image: 'https://images.unsplash.com/photo-1530196606945-81ab3df90d91?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Beginner',
      estimatedTime: '4-6 min',
      rating: 4.6
    },
    {
      title: 'Create From Brainstorm',
      description: 'Let our AI brainstorm creative content ideas aligned with your marketing strategy.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      difficulty: 'Intermediate',
      estimatedTime: '6-8 min',
      rating: 4.8
    }
  ];

  return (
    <div className="h-screen overflow-hidden">
      <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-indigo-50 to-pink-50 h-full">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            AI Agents
          </h1>
          <p className="text-base sm:text-lg text-indigo-600">
            A Comprehensive Suite of Advanced Tools for Social Media Content Creation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-y-auto h-[calc(100%-5rem)] pb-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              {...feature} 
              onClick={() => setSelectedFeature(feature.title)}
            />
          ))}
        </div>
      </div>

      <ComingSoonModal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature || ''}
      />
    </div>
  );
};