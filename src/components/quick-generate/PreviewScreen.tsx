import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiCalendar, FiSend, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { PlatformPreview } from './PlatformPreview';
import { useAuthStore } from '../../store/authStore';
import { backFormatter } from '../../utils/backFormatter';
import axios from 'axios';
import Cookies from 'js-cookie';

// API Configuration
const BASE_URL = 'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api';

const getAuthHeaders = () => {
  const jwtToken = Cookies.get('jwt_token');
  if (!jwtToken) {
    throw new Error('No JWT token found');
  }
  return {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  };
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: getAuthHeaders()
});

interface PreviewScreenProps {
  content: string;
  image: string | null;
  video: string | null;
  pdf: string | null;
  platform: string;
  companyName: string;
  onBack: () => void;
}

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
}

interface BrandSelectionModalProps {
  brands: Record<string, string[]>;
  onSelect: (brandName: string) => void;
  onClose: () => void;
  platform: string;
}

const BrandSelectionModal: React.FC<BrandSelectionModalProps> = ({ brands, onSelect, onClose, platform }) => {
  // Get all brand names
  const brandNames = Object.keys(brands);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-indigo-900">Select Brand</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 text-indigo-400" />
          </button>
        </div>
        
        <div className="space-y-4">
          {brandNames.length === 0 ? (
            <p className="text-indigo-900">No brands available</p>
          ) : (
            brandNames.map(brandName => {
              // Get platforms for this brand
              const brandPlatforms = brands[brandName];
              console.log(`${brandName} platforms:`, brandPlatforms);
              
              // Check if this brand has any platforms and includes the current platform
              if (brandPlatforms && brandPlatforms.includes(platform.toLowerCase())) {
                return (
                  <button
                    key={brandName}
                    onClick={() => onSelect(brandName)}
                    className="w-full p-4 text-left border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    <span className="font-medium text-indigo-900">{brandName}</span>
                    <div className="text-sm text-indigo-500 mt-1">
                      Connected platforms: {brandPlatforms.join(', ')}
                    </div>
                  </button>
                );
              }
              return null;
            })
          )}
        </div>
        
        {/* Show message if no brands have the selected platform */}
        {brandNames.length > 0 &&
        !brandNames.some(name => brands[name].includes(platform.toLowerCase())) && (
          <p className="text-indigo-900 text-center mt-4">
            No brands connected to {platform}
          </p>
        )}
      </div>
    </div>
  );
};

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

  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

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
              min={minDate}
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
            disabled={!selectedDate || !selectedTime}
            className={`w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg transition-colors ${
              !selectedDate || !selectedTime 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-indigo-600 hover:to-pink-600'
            }`}
          >
            Schedule Post
          </button>
        </div>
      </div>
    </div>
  );
};

export const PreviewScreen: React.FC<PreviewScreenProps> = ({
  content,
  image,
  video,
  pdf,
  platform,
  companyName,
  onBack
}) => {
  const { user } = useAuthStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [brands, setBrands] = useState<Record<string, string[]>>({});
  const [notification, setNotification] = useState<NotificationProps | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await api.post('/fetch_connected_accounts');
      setBrands(response.data.result);
    } catch (error) {
      showNotification('error', 'Failed to fetch connected accounts');
    }
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const convertBase64ToUrl = async (base64String: string): Promise<string> => {
    try {
      const response = await api.post('/generate_url_for_image', {
        b64_string: base64String.split(',')[1]
      });
      return response.data;
    } catch (error) {
      console.error('Error converting base64 to URL:', error);
      throw error;
    }
  };

  const handlePublish = async (brandName: string) => {
    if (!user?.email) {
      showNotification('error', 'User email not found');
      return;
    }

    setIsPublishing(true);
    setShowBrandModal(false);

    try {
      let mediaUrls: string[] = [];
      
      if (image) {
        try {
          const imageUrl = image.startsWith('data:image') 
            ? await convertBase64ToUrl(image)
            : image;
          mediaUrls.push(imageUrl);
        } catch (error) {
          console.error('Error converting image:', error);
          showNotification('error', 'Failed to process image');
          setIsPublishing(false);
          return;
        }
      }

      if (video) {
        try {
          if (video.startsWith('data:video')) {
            const response = await api.post('/generate_url_for_video', {
              b64_string: video.split(',')[1]
            });
            mediaUrls.push(response.data);
          } else {
            mediaUrls.push(video);
          }
        } catch (error) {
          console.error('Error converting video:', error);
          showNotification('error', 'Failed to process video');
          setIsPublishing(false);
          return;
        }
      }

      if (pdf && pdf.startsWith('data:application')) {
        try {
          const response = await api.post('/generate_url_for_pdf', {
            b64_string: pdf.split(',')[1]
          });
          mediaUrls.push(response.data);
        } catch (error) {
          console.error('Error converting PDF:', error);
          showNotification('error', 'Failed to process PDF');
          setIsPublishing(false);
          return;
        }
      }

      const formattedContent = backFormatter(content);

      if (scheduledDate) {
        const scheduleData = {
          data: {
            platform: platform.toLowerCase(),
            post: formattedContent,
            brand_name: brandName,
            title: formattedContent,
            ...(mediaUrls.length > 0 && { media_url: mediaUrls })
          },
          time: {
            year: scheduledDate.getFullYear(),
            month: scheduledDate.getMonth() + 1,
            day: scheduledDate.getDate(),
            hours: scheduledDate.getHours(),
            minutes: scheduledDate.getMinutes()
          }
        };

        const scheduleResponse = await api.post('/set_auto_schedule', scheduleData);

        if (scheduleResponse.status === 200) {
          const calendarData = {
            year: scheduledDate.getFullYear(),
            month: scheduledDate.getMonth() + 1,
            day: scheduledDate.getDate(),
            hours: scheduledDate.getHours(),
            minutes: scheduledDate.getMinutes(),
            platform: platform.toLowerCase(),
            content: formattedContent,
            ...(mediaUrls.length > 0 && { media: mediaUrls })
          };

          await api.post('/db/add_post', calendarData);
          showNotification('success', 'Post successfully scheduled!');
        }
      } else {
        const payload = {
          platform: platform.toLowerCase(),
          post: formattedContent,
          brand_name: brandName,
          title: formattedContent,
          ...(mediaUrls.length > 0 && { media_url: mediaUrls })
        };

        const response = await api.post('/post_to_social_media', payload);

        if (response.status === 200) {
          showNotification('success', 'Post successfully published!');
        }
      }
    } catch (error) {
      showNotification('error', `${scheduledDate ? 'Scheduling' : 'Post'} failed. Please ensure that you have connected ${platform}`);
    } finally {
      setIsPublishing(false);
      setScheduledDate(null);
    }
  };

  const handleScheduleModalConfirm = (date: Date) => {
    setScheduledDate(date);
    setShowScheduleModal(false);
    setShowBrandModal(true);
  };

  const handlePublishClick = () => {
    setScheduledDate(null);
    setShowBrandModal(true);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleScheduleModalConfirm}
        />
      )}

      {showBrandModal && (
        <BrandSelectionModal
          brands={brands}
          platform={platform}
          onSelect={handlePublish}
          onClose={() => setShowBrandModal(false)}
        />
      )}

      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm border-b border-indigo-100">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Editor</span>
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-6 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2"
          >
            <FiCalendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
          <button
            onClick={handlePublishClick}
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

      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold text-indigo-900 mb-6 capitalize">
            {platform} Preview
          </h2>
          <PlatformPreview
            platform={platform}
            content={content}
            companyName={companyName}
            image={image}
            video={video}
            pdf={pdf}
          />
        </div>
      </div>
    </div>
  );
};