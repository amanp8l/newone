import React, { useState } from 'react';
import { FiZap, FiX, FiPlus } from 'react-icons/fi';
import axios from 'axios';

interface TopicSelectorProps {
  formData: {
    topic: string;
    companyName: string;
    products: string;
    objective: string;
    targetAudience: string;
  };
  onInputChange: (field: string, value: any) => void;
  showValidation: boolean;
}

export const TopicSelector: React.FC<TopicSelectorProps> = ({
  formData,
  onInputChange,
  showValidation,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState('');

  const generateTopics = async () => {
    // Clear previous error
    setError(null);

    // Validate campaign details
    const campaignDetails = {
      company: formData.companyName?.trim(),
      product: formData.products?.trim(),
      campaign: formData.objective?.trim(),
      audience: formData.targetAudience?.trim()
    };

    // Check if any field is empty
    const missingFields = Object.entries(campaignDetails)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      setError(`Please fill in the following campaign details: ${missingFields.join(', ')}`);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/topics', campaignDetails);

      if (response.data) {
        // Split the response text into individual topics
        const topicList = response.data
          .split('\n')
          .filter((line: string) => line.trim())
          .map((line: string) => line.replace(/^[-*•]\s*/, '').replace(/\*+/g, '').trim());

        setSuggestions(topicList);
      }
    } catch (err: any) {
      console.error('Error generating topics:', err);
      setError(err.response?.data?.message || 'Failed to generate topics');
    } finally {
      setIsGenerating(false);
    }
  };

  const addTopic = () => {
    if (currentTopic.trim()) {
      const newTopics = [...topics, currentTopic.trim()];
      setTopics(newTopics);
      onInputChange('topic', newTopics.join('|'));
      setCurrentTopic('');
    }
  };

  const removeTopic = (index: number) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
    onInputChange('topic', newTopics.join('|'));
  };

  const addSuggestedTopic = (topic: string) => {
    if (!topics.includes(topic)) {
      const newTopics = [...topics, topic];
      setTopics(newTopics);
      onInputChange('topic', newTopics.join('|'));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-indigo-900">Topics *</label>
          <button
            onClick={generateTopics}
            disabled={isGenerating}
            className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-pink-100 text-indigo-600 hover:from-indigo-200 hover:to-pink-200 transition-all group relative"
          >
            <FiZap className="w-4 h-4" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-indigo-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Generate using AI
            </span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTopic}
              onChange={(e) => setCurrentTopic(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTopic()}
              className={`flex-1 rounded-lg border ${
                showValidation && topics.length === 0
                  ? 'border-pink-300 focus:ring-pink-500'
                  : 'border-indigo-200 focus:ring-indigo-500'
              } px-4 py-2 focus:outline-none focus:ring-2`}
              placeholder="Enter a topic"
            />
            <button
              onClick={addTopic}
              disabled={!currentTopic.trim()}
              className="p-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>

          {showValidation && topics.length === 0 && (
            <p className="text-sm text-pink-500">At least one topic is required</p>
          )}

          {error && (
            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg text-pink-600">
              {error}
            </div>
          )}

          {topics.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-indigo-900">Selected Topics</h4>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-lg group"
                  >
                    <span className="text-indigo-900">{topic}</span>
                    <button
                      onClick={() => removeTopic(index)}
                      className="text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isGenerating ? (
        <div className="p-8 text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-indigo-600">Generating topic suggestions...</p>
        </div>
      ) : suggestions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-indigo-900">AI-Generated Topic Suggestions</h4>
          <div className="grid gap-3">
            {suggestions.map((topic, index) => (
              <button
                key={index}
                onClick={() => addSuggestedTopic(topic)}
                disabled={topics.includes(topic)}
                className={`text-left p-4 rounded-xl transition-all transform hover:-translate-y-1 ${
                  topics.includes(topic)
                    ? 'bg-gradient-to-r from-indigo-100/50 to-pink-100/50 text-indigo-400 cursor-not-allowed'
                    : 'bg-white shadow-sm hover:shadow-md border border-indigo-100 hover:border-indigo-200 text-indigo-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{topic}</span>
                  {!topics.includes(topic) && (
                    <span className="text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to add
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};