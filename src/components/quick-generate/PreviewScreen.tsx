import React, { useState } from 'react';
import { FiArrowLeft, FiCalendar, FiSend, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import { PlatformPreview } from './PlatformPreview';
import { useAuthStore } from '../../store/authStore';
import { backFormatter } from '../../utils/backFormatter';
import axios from 'axios';
import Cookies from 'js-cookie';

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
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const convertBase64ToUrl = async (base64String: string): Promise<string> => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }
      const response = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/generate_url_for_image', {
        b64_string: base64String.split(',')[1] // Remove data URL prefix
      }, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error converting base64 to URL:', error);
      throw error;
    }
  };

  const handlePublish = async () => {
    if (!user?.email) {
      showNotification('error', 'User email not found');
      return;
    }

    setIsPublishing(true);

    try {
      let imageUrl: string | null = null;
      let videoUrl: string | null = null;
      let pdfUrl: string | null = null;
      
      // Convert base64 image to URL if image exists and is base64
      if (image) {
        try {
          if (image.startsWith('data:image')) {
            imageUrl = await convertBase64ToUrl(image);
          } else {
            imageUrl = image;
          }
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
            const jwtToken = Cookies.get('jwt_token');
            if (!jwtToken) {
              throw new Error('No JWT token found');
            }
            const response = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/generate_url_for_video', {
              b64_string: video.split(',')[1]
            }, {
              headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
              }
            });
            videoUrl = response.data;
          } else {
            videoUrl = video;
          }
        } catch (error) {
          console.error('Error converting video:', error);
          showNotification('error', 'Failed to process video');
          setIsPublishing(false);
          return;
        }
      }
      // Convert base64 PDF to URL if PDF exists
      if (pdf && pdf.startsWith('data:application')) {
        try {
          const jwtToken = Cookies.get('jwt_token');
          if (!jwtToken) {
            throw new Error('No JWT token found');
          }
          const response = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/generate_url_for_pdf', {
            b64_string: pdf.split(',')[1]
          }, {
            headers: {
              'Authorization': `Bearer ${jwtToken}`,
              'Content-Type': 'application/json'
            }
          });
          pdfUrl = response.data;
        } catch (error) {
          console.error('Error converting PDF:', error);
          showNotification('error', 'Failed to process PDF');
          setIsPublishing(false);
          return;
        }
      }

      // Prepare API payload with formatted content
      const formattedContent = backFormatter(content);
      const payload = {
        platform: platform.toLowerCase(),
        post: formattedContent,
        brand_name: companyName,
        media_url: [imageUrl, videoUrl, pdfUrl].filter(Boolean),
        title: formattedContent
      };

      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }
      const response = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/post_to_social_media', payload, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        showNotification('success', 'Post successfully published!');
      }
    } catch (error: any) {
      showNotification('error', `Post failed. Please ensure that you have connected ${platform}`);
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
      let imageUrl: string | null = null;
      
      // Convert base64 image to URL if image exists and is base64
      if (image) {
        try {
          if (image.startsWith('data:')) {
            imageUrl = await convertBase64ToUrl(image);
          } else {
            imageUrl = image;
          }
        } catch (error) {
          console.error('Error converting image:', error);
          showNotification('error', 'Failed to process image');
          setIsPublishing(false);
          return;
        }
      }

      // Prepare formatted content
      const formattedContent = backFormatter(content);

      // Prepare schedule data
      const scheduleData = {
        data: {
          platform: platform.toLowerCase(),
          post: formattedContent,
          brand_name: companyName,
          media_url: imageUrl ? [imageUrl] : undefined,
          title: formattedContent
        },
        time: {
          year: scheduledDate.getFullYear(),
          month: scheduledDate.getMonth() + 1,
          day: scheduledDate.getDate(),
          hours: scheduledDate.getHours(),
          minutes: scheduledDate.getMinutes()
        }
      };
      const jwtToken = Cookies.get('jwt_token');
      if (!jwtToken) {
        throw new Error('No JWT token found');
      }
      // Schedule the post
      const scheduleResponse = await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/set_auto_schedule', scheduleData, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (scheduleResponse.status === 200) {
        // Prepare calendar data
        const calendarData = {
          year: scheduledDate.getFullYear(),
          month: scheduledDate.getMonth() + 1,
          day: scheduledDate.getDate(),
          hours: scheduledDate.getHours(),
          minutes: scheduledDate.getMinutes(),
          platform: platform.toLowerCase(),
          content: formattedContent,
          media: imageUrl ? [imageUrl] : undefined
        };

        await axios.post('https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api/db/add_post', calendarData,  {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
          }
        });

        showNotification('success', 'Post successfully scheduled!');
      }
    } catch (error: any) {
      showNotification('error', `Scheduling failed. Please ensure that you have connected ${platform}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex flex-col">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onSchedule={handleSchedule}
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