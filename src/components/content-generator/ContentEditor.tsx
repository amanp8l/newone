import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BlogEditor } from './editors/BlogEditor';
import { PlatformEditor } from './editors/PlatformEditor';
import { ImagePicker } from '../quick-generate/ImagePicker';
import { AIAssistant } from './editors/AIAssistant';
import { PreviewScreen } from '../quick-generate/PreviewScreen';

interface ContentEditorProps {
  formData: {
    companyName: string;
    products: string;
    objective: string;
    targetAudience: string;
    topic: string;
    contentTone: string;
    selectedPlatforms: string[];
  };
  onBack: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  formData,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'blog' | 'twitter' | 'facebook' | 'linkedin'>('blog');
  const [blogContent, setBlogContent] = useState('');
  const [platformContent, setPlatformContent] = useState({
    twitter: '',
    facebook: '',
    linkedin: ''
  });
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [platformsEnabled, setPlatformsEnabled] = useState(false);

  useEffect(() => {
    generateBlogContent();
  }, []);

  const generateBlogContent = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/gen_blog', {
        index_name: formData.companyName,
        company: formData.companyName,
        product: formData.products,
        campaign: formData.objective,
        audience: formData.targetAudience,
        topics: formData.topic,
        tone: formData.contentTone,
        limit: 6000
      });

      setBlogContent(response.data);
    } catch (error) {
      console.error('Error generating blog content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePlatformContent = async () => {
    setIsGenerating(true);
    try {
      const [linkedinRes, twitterRes, facebookRes] = await Promise.all([
        axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/linkedin_post', { blog: blogContent }),
        axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/twitter_post', { blog: blogContent }),
        axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/facebook_post', { blog: blogContent })
      ]);

      setPlatformContent({
        linkedin: linkedinRes.data,
        twitter: twitterRes.data,
        facebook: facebookRes.data
      });
      setPlatformsEnabled(true);
      setActiveTab('linkedin');
    } catch (error) {
      console.error('Error generating platform content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleContentUpdate = (platform: string, content: string) => {
    if (platform === 'blog') {
      setBlogContent(content);
    } else {
      setPlatformContent(prev => ({
        ...prev,
        [platform]: content
      }));
    }
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={activeTab === 'blog' ? blogContent : platformContent[activeTab]}
        image={selectedImage}
        platform={activeTab}
        companyName={formData.companyName}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Back to Editor
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
        >
          Preview
        </button>
      </div>

      <div className="flex-1 p-6 flex gap-6">
        <div className={`flex-1 transition-all duration-300 ${showAIChat ? 'w-2/3' : 'w-full'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full flex flex-col">
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setActiveTab('blog')}
                className={`p-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  activeTab === 'blog'
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                    : 'hover:bg-indigo-50 text-indigo-600'
                }`}
              >
                <span>Blog</span>
              </button>
              {formData.selectedPlatforms.map(platform => (
                <button
                  key={platform}
                  onClick={() => platformsEnabled && setActiveTab(platform as any)}
                  disabled={!platformsEnabled}
                  className={`p-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    activeTab === platform
                      ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                      : 'hover:bg-indigo-50 text-indigo-600'
                  } ${!platformsEnabled && 'opacity-50 cursor-not-allowed'}`}
                >
                  <span className="capitalize">{platform}</span>
                </button>
              ))}
            </div>

            {activeTab === 'blog' ? (
              <BlogEditor
                content={blogContent}
                onContentChange={(content) => handleContentUpdate('blog', content)}
                onNext={generatePlatformContent}
                isGenerating={isGenerating}
                onImageClick={() => setShowImagePicker(true)}
                onAIClick={() => setShowAIChat(true)} selectedImage={null} companyName={''}              />
            ) : (
              <PlatformEditor
                platform={activeTab}
                content={platformContent[activeTab]}
                onContentChange={(content) => handleContentUpdate(activeTab, content)}
                isGenerating={isGenerating}
                onImageClick={() => setShowImagePicker(true)}
                onAIClick={() => setShowAIChat(true)}
              />
            )}
          </div>
        </div>

        {showAIChat && (
          <div className="w-1/3">
            <AIAssistant
              onClose={() => setShowAIChat(false)}
              activePlatform={activeTab}
              currentContent={activeTab === 'blog' ? blogContent : platformContent[activeTab]}
              onContentUpdate={(content) => handleContentUpdate(activeTab, content)}
              onImageSelect={(url) => setSelectedImage(url)}
            />
          </div>
        )}
      </div>

      {showImagePicker && (
        <ImagePicker
          onClose={() => setShowImagePicker(false)}
          onImageSelect={(url) => setSelectedImage(url)}
        />
      )}
    </div>
  );
};