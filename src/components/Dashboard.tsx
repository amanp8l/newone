import React from 'react';
import { FiArrowUpRight, FiClock, FiStar } from 'react-icons/fi';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  difficulty?: string;
  estimatedTime?: string;
  rating?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  image, 
  difficulty = 'Easy',
  estimatedTime = '5-10 min',
  rating = 4.8
}) => (
  <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer overflow-hidden">
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

export const Dashboard: React.FC = () => {
  const features = [
    {
      title: 'Create From Images',
      description: 'Upload images and let our AI analyze them to generate engaging social media content that resonates with your audience.',
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
      <div className="p-8 bg-gradient-to-br from-indigo-50 to-pink-50 h-full">
        <div className="mb-6">
          <p className="text-lg font-medium text-indigo-600">A Comprehensive Suite of Advanced Tools for Social Media Content Creation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-[calc(100%-5rem)] pb-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};