import React, { useState } from 'react';
import { FiArrowLeft, FiBold, FiItalic, FiImage, FiZap, FiCalendar, FiSend, FiEye, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { PlatformTabs } from './PlatformTabs';
import { AIChat } from './AIChat';
import { ImagePicker } from './ImagePicker';
import { PreviewScreen } from './PreviewScreen';
import { GeneratedContent } from './types';
import { useAuthStore } from '../../store/authStore';
import { formatPlatformContent } from '../../utils/platformFormatter';
import axios from 'axios';

interface ContentEditorProps {
  selectedPlatforms: string[];
  onBack: () => void;
  generatedContent: GeneratedContent;
}

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => (
  <div className="fixed top-6 right-6 bg-white rounded-xl shadow-lg p-4 animate-fadeIn z-50 flex items-center space-x-3 border border-indigo-100">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      type === 'success' 
        ? 'bg-gradient-to-br from-indigo-500 to-pink-500' 
        : 'bg-red-500'
    }`}>
      {type === 'success' ? (
        <FiCheck className="w-5 h-5 text-white" />
      ) : (
        <FiX className="w-5 h-5 text-white" />
      )}
    </div>
    <p className="text-indigo-900">{message}</p>
  </div>
);

interface ScheduleModalProps {
  onClose: () => void;
  onSchedule: (date: Date) => void;
}

const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime) return;
    const dateTime = new Date(`${selectedDate}T${selectedTime}`);
    onSchedule(dateTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-indigo-900">Schedule Post</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-indigo-400" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-900 mb-2">
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-lg border border-indigo-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleSchedule}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors"
          >
            Schedule Post
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  selectedPlatforms,
  onBack,
  generatedContent
}) => {
  const { user } = useAuthStore();
  const [activePlatform, setActivePlatform] = useState(selectedPlatforms[0]);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [platformContent, setPlatformContent] = useState<GeneratedContent>(
    Object.fromEntries(
      Object.entries(generatedContent).map(([platform, content]) => [
        platform,
        formatPlatformContent(content)
      ])
    )
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePublish = async () => {
    if (!user?.email) {
      showNotification('error', 'User email not found');
      return;
    }

    setIsPublishing(true);

    try {
      const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/post_to_social_media', {
        user_email: user.email,
        platform: activePlatform.toLowerCase(),
        post: platformContent[activePlatform],
        media_url: selectedImages
      });

      if (response.status === 200) {
        showNotification('success', 'Post successfully published!');
      }
    } catch (error: any) {
      showNotification('error', `Post failed. Please ensure that you have connected ${activePlatform}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedule = async (scheduledDate: Date) => {
    if (!user?.email) {
      showNotification('error', 'User email not found');
      return;
    }

    setIsPublishing(true);

    try {
      // Prepare schedule data
      const scheduleData = {
        data: {
          user_email: user.email,
          platform: activePlatform.toLowerCase(),
          post: platformContent[activePlatform],
          media_url: selectedImages
        },
        time: {
          year: scheduledDate.getFullYear(),
          month: scheduledDate.getMonth() + 1,
          day: scheduledDate.getDate(),
          hours: scheduledDate.getHours(),
          minutes: scheduledDate.getMinutes()
        }
      };

      // Schedule the post
      const scheduleResponse = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/set_auto_schedule', scheduleData);

      if (scheduleResponse.status === 200) {
        // Save to calendar
        const calendarData = {
          year: scheduledDate.getFullYear(),
          month: scheduledDate.getMonth() + 1,
          day: scheduledDate.getDate(),
          hours: scheduledDate.getHours(),
          minutes: scheduledDate.getMinutes(),
          platform: activePlatform.toLowerCase(),
          user_email: user.email,
          content: platformContent[activePlatform],
          media: selectedImages
        };

        await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/db/add_post', calendarData);

        showNotification('success', 'Post successfully scheduled!');
      }
    } catch (error: any) {
      showNotification('error', `Scheduling failed. Please ensure that you have connected ${activePlatform}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleTextEdit = (command: string) => {
    document.execCommand(command, false);
  };

  const handleContentUpdate = (platform: string, content: string) => {
    setPlatformContent(prev => ({
      ...prev,
      [platform]: content
    }));
  };

  const handleImageSelect = (url: string) => {
    setSelectedImages(prev => [...prev, url]);
    setShowImagePicker(false);
  };

  const handleImageDelete = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  if (showPreview) {
    return (
      <PreviewScreen
        content={platformContent[activePlatform]}
        image={selectedImages[0]}
        platform={activePlatform}
        companyName={user?.company || 'Your Company'}
        onBack={() => setShowPreview(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiEye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiCalendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors flex items-center space-x-2"
          >
            {isPublishing ? (
              <>
                <FiLoader className="w-4 h-4 animate-spin" />
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <FiSend className="w-4 h-4" />
                <span>Publish</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex gap-6">
        <div className={`flex-1 transition-all duration-300 ${showAIChat ? 'w-2/3' : 'w-full'}`}>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-sm p-6 h-full flex flex-col">
            <PlatformTabs
              platforms={selectedPlatforms}
              activePlatform={activePlatform}
              onPlatformChange={setActivePlatform}
              isEnabled={true}
            />

            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-indigo-100">
              <button
                onClick={() => handleTextEdit('bold')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiBold className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => handleTextEdit('italic')}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiItalic className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => setShowImagePicker(true)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <FiImage className="w-5 h-5 text-indigo-600" />
              </button>
              <button
                onClick={() => setShowAIChat(!showAIChat)}
                className="p-2 hover:bg-indigo-50 rounded-lg transition-colors ml-auto"
              >
                <FiZap className="w-5 h-5 text-indigo-600" />
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <div
                className="flex-1 w-full focus:outline-none overflow-auto mb-4"
                contentEditable
                dangerouslySetInnerHTML={{ __html: platformContent[activePlatform] || '' }}
                onInput={(e) => handleContentUpdate(activePlatform, e.currentTarget.innerHTML)}
              />

              {selectedImages.length > 0 && (
                <div className="border-t border-indigo-100 pt-4">
                  <h3 className="text-sm font-medium text-indigo-900 mb-3">Attached Images</h3>
                  <div className="grid grid-cols-6 gap-4">
                    {selectedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={`Attached ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleImageDelete(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {showAIChat && (
          <div className="w-1/3">
            <AIChat
              onClose={() => setShowAIChat(false)}
              activePlatform={activePlatform}
              currentContent={platformContent[activePlatform]}
              onContentUpdate={(content) => handleContentUpdate(activePlatform, content)}
            />
          </div>
        )}
      </div>

      {showImagePicker && (
        <ImagePicker
          onClose={() => setShowImagePicker(false)}
          onImageSelect={handleImageSelect}
          allowMultiple={true}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedule}
        />
      )}
    </div>
  );
};