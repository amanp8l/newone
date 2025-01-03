    import React, { useState } from 'react';
    import { FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiThumbsUp, FiFile, FiSend, FiCheck, FiMoreVertical, FiEdit, FiCalendar, FiLoader } from 'react-icons/fi';
    import { useAuthStore } from '../../store/authStore';
    import { PreviewPlatformContent } from '../../utils/previewFormatter';
    import axios from 'axios';

    interface PlatformPreviewProps {
    platform: string;
    content: string;
    companyName: string;
    image: string | null;
    video: string | null;
    pdf: string | null;
    }

    interface NotificationProps {
    type: 'success' | 'error';
    message: string;
    }

    interface ScheduleModalProps {
    onClose: () => void;
    onSchedule: (date: Date) => void;
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
            <FiSend className="w-5 h-5 text-white" />
        )}
        </div>
        <p className="text-indigo-900">{message}</p>
    </div>
    );

    const ScheduleModal: React.FC<ScheduleModalProps> = ({ onClose, onSchedule }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [isScheduling, setIsScheduling] = useState(false);

    const handleSchedule = () => {
        if (!selectedDate || !selectedTime) return;
        setIsScheduling(true);
        const dateTime = new Date(`${selectedDate}T${selectedTime}`);
        onSchedule(dateTime);
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
                <FiCheck className="w-5 h-5 text-indigo-400" />
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
                disabled={isScheduling}
                className="w-full py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg hover:from-indigo-600 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isScheduling ? (
                <>
                    <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                    Scheduling...
                </>
                ) : (
                'Schedule Post'
                )}
            </button>
            </div>
        </div>
        </div>
    );
    };

    export const PlatformPreview: React.FC<PlatformPreviewProps> = ({
    platform,
    content: initialContent,
    companyName,
    image,
    video,
    pdf
    }) => {
    const { user } = useAuthStore();
    const [isPublishing, setIsPublishing] = useState(false);
    const [notification, setNotification] = useState<NotificationProps | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(initialContent);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [content, setContent] = useState(initialContent);

    const safeContent = typeof content === 'string' ? content : '';
    const formattedContent = PreviewPlatformContent(safeContent);

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
        let imageUrl: string | null = null;
        
        if (image && image.startsWith('data:')) {
            try {
            const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_url_for_image', {
                b64_string: image.split(',')[1]
            });
            imageUrl = response.data;
            } catch (error) {
            console.error('Error converting image:', error);
            showNotification('error', 'Failed to process image');
            setIsPublishing(false);
            return;
            }
        }

        const payload = {
            user_email: user.email,
            platform: platform.toLowerCase(),
            post: editedContent,
            ...(imageUrl || image ? { media_url: [imageUrl || image] } : {})
        };

        const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/post_to_social_media', payload);

        if (response.status === 200) {
            showNotification('success', 'Post successfully published!');
            setContent(editedContent);
            setIsEditing(false);
        }
        } catch (error: any) {
        showNotification('error', `Post failed. Please ensure that you have connected ${platform}`);
        } finally {
        setIsPublishing(false);
        setShowMenu(false);
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
        
        if (image && image.startsWith('data:')) {
            try {
            const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_url_for_image', {
                b64_string: image.split(',')[1]
            });
            imageUrl = response.data;
            } catch (error) {
            console.error('Error converting image:', error);
            showNotification('error', 'Failed to process image');
            setIsPublishing(false);
            return;
            }
        }

        const scheduleData = {
            data: {
            user_email: user.email,
            platform: platform.toLowerCase(),
            post: editedContent,
            media_url: imageUrl ? [imageUrl] : undefined
            },
            time: {
            year: scheduledDate.getFullYear(),
            month: scheduledDate.getMonth() + 1,
            day: scheduledDate.getDate(),
            hours: scheduledDate.getHours(),
            minutes: scheduledDate.getMinutes()
            }
        };

        const scheduleResponse = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/set_auto_schedule', scheduleData);

        if (scheduleResponse.status === 200) {
            const calendarData = {
            year: scheduledDate.getFullYear(),
            month: scheduledDate.getMonth() + 1,
            day: scheduledDate.getDate(),
            hours: scheduledDate.getHours(),
            minutes: scheduledDate.getMinutes(),
            platform: platform.toLowerCase(),
            user_email: user.email,
            content: editedContent,
            media: imageUrl ? [imageUrl] : undefined
            };

            await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/db/add_post', calendarData);
            showNotification('success', 'Post successfully scheduled!');
            setContent(editedContent);
            setIsEditing(false);
        }
        } catch (error: any) {
        showNotification('error', `Scheduling failed. Please ensure that you have connected ${platform}`);
        } finally {
        setIsPublishing(false);
        setShowMenu(false);
        setShowScheduleModal(false);
        }
    };

    const renderTextEditor = () => (
        <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full mt-2 p-4 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[450px] text-base leading-relaxed resize-y"
        placeholder="Edit your post..."
        />
    );

    const renderMenu = () => (
        <div className="absolute top-4 right-4 z-10">
        <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 bg-white/90 backdrop-blur-sm border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
        >
            <FiMoreVertical className="w-4 h-4" />
        </button>

        {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-indigo-100 py-2">
            <button
                onClick={() => {
                if (isEditing) {
                    setContent(editedContent);
                }
                setIsEditing(!isEditing);
                setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 flex items-center space-x-2"
            >
                <FiEdit className="w-4 h-4" />
                <span>{isEditing ? 'Save Edit' : 'Edit'}</span>
            </button>
            <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <button
                onClick={() => {
                setShowScheduleModal(true);
                setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left hover:bg-indigo-50 text-indigo-600 flex items-center space-x-2"
            >
                <FiCalendar className="w-4 h-4" />
                <span>Schedule</span>
            </button>
            </div>
        )}
        </div>
    );

    const renderTwitterPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {renderMenu()}
        <div className="p-7">
            <div className="flex space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {companyName.charAt(0)}
            </div>
            <div className="flex-1">
                <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">{companyName}</span>
                <span className="text-gray-500">@{companyName.toLowerCase().replace(/\s/g, '')}</span>
                </div>
                {isEditing ? (
                renderTextEditor()
                ) : (
                <div
                    className="mt-2 text-gray-900"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
                )}
                {image && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                    <img src={image} alt="Post" className="w-full h-auto" />
                </div>
                )}
                {video && (
                <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                    <video src={video} controls className="w-full h-auto" />
                </div>
                )}
                {pdf && (
                <div className="mt-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center space-x-3">
                    <FiFile className="w-6 h-6 text-indigo-600" />
                    <div>
                    <span className="text-sm font-medium text-indigo-900">Attached PDF</span>
                    <p className="text-xs text-indigo-600">Click to view document</p>
                    </div>
                </div>
                )}
                <div className="flex items-center justify-between mt-4 text-gray-500">
                <button className="flex items-center space-x-2 group">
                    <div className="p-2 group-hover:bg-blue-50 rounded-full transition-colors">
                    <FiMessageCircle className="w-5 h-5 group-hover:text-blue-500" />
                    </div>
                    <span className="group-hover:text-blue-500">24</span>
                </button>
                <button className="flex items-center space-x-2 group">
                    <div className="p-2 group-hover:bg-green-50 rounded-full transition-colors">
                    <FiRepeat className="w-5 h-5 group-hover:text-green-500" />
                    </div>
                    <span className="group-hover:text-green-500">12</span>
                </button>
                <button className="flex items-center space-x-2 group">
                    <div className="p-2 group-hover:bg-pink-50 rounded-full transition-colors">
                    <FiHeart className="w-5 h-5 group-hover:text-pink-500" />
                    </div>
                    <span className="group-hover:text-pink-500">148</span>
                </button>
                <button className="p-2 group-hover:bg-blue-50 rounded-full transition-colors">
                    <FiShare2 className="w-5 h-5 group-hover:text-blue-500" />
                </button>
                </div>
            </div>
            </div>
        </div>
        {notification && (
            <Notification type={notification.type} message={notification.message} />
        )}
        {showScheduleModal && (
            <ScheduleModal
            onClose={() => setShowScheduleModal(false)}
            onSchedule={handleSchedule}
            />
        )}
        </div>
    );

    const renderFacebookPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {renderMenu()}
        <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {companyName.charAt(0)}
            </div>
            <div>
                <span className="font-bold text-gray-900">{companyName}</span>
                <div className="text-xs text-gray-500 flex items-center space-x-1">
                <span>Just now</span>
                <span>·</span>
                <span>🌎</span>
                </div>
            </div>
            </div>
        </div>
        <div className="p-4">
            {isEditing ? (
            renderTextEditor()
            ) : (
            <div
                className="text-gray-900"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            )}
            {image && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
                <img src={image} alt="Post" className="w-full h-auto" />
            </div>
            )}
            {video && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
                <video src={video} controls className="w-full h-auto" />
            </div>
            )}
            {pdf && (
            <div className="mt-3 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center space-x-3">
                <FiFile className="w-6 h-6 text-indigo-600" />
                <div>
                <span className="text-sm font-medium text-indigo-900">Attached PDF</span>
                <p className="text-xs text-indigo-600">Click to view document</p>
                </div>
            </div>
            )}
        </div>
        <div className="px-4 py-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-gray-500">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <FiThumbsUp className="w-5 h-5" />
                <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <FiMessageCircle className="w-5 h-5" />
                <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <FiShare2 className="w-5 h-5" />
                <span>Share</span>
            </button>
            </div>
        </div>
        {notification && (
            <Notification type={notification.type} message={notification.message} />
        )}
        {showScheduleModal && (
            <ScheduleModal
            onClose={() => setShowScheduleModal(false)}
            onSchedule={handleSchedule}
            />
        )}
        </div>
    );

    const renderLinkedInPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {renderMenu()}
        <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {companyName.charAt(0)}
            </div>
            <div>
                <span className="font-bold text-gray-900">{companyName}</span>
                <div className="text-xs text-gray-500">Company · Just now</div>
            </div>
            </div>
        </div>
        <div className="p-4">
            {isEditing ? (
            renderTextEditor()
            ) : (
            <div className="text-gray-900">{formattedContent}</div>
            )}
            {image && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
                <img src={image} alt="Post" className="w-full h-auto" />
            </div>
            )}
            {video && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
                <video src={video} controls className="w-full h-auto" />
            </div>
            )}
            {pdf && (
            <div className="mt-3 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center space-x-3">
                <FiFile className="w-6 h-6 text-indigo-600" />
                <div>
                <span className="text-sm font-medium text-indigo-900">Attached PDF</span>
                <p className="text-xs text-indigo-600">Click to view document</p>
                </div>
            </div>
            )}
        </div>
        <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-2 group">
                <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiThumbsUp className="w-5 h-5 group-hover:text-blue-500" />
                </div>
                <span className="group-hover:text-blue-500">Like</span>
            </button>
            <button className="flex items-center space-x-2 group">
                <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiMessageCircle className="w-5 h-5 group-hover:text-blue-500" />
                </div>
                <span className="group-hover:text-blue-500">Comment</span>
            </button>
            <button className="flex items-center space-x-2 group">
                <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiRepeat className="w-5 h-5 group-hover:text-blue-500" />
                </div>
                <span className="group-hover:text-blue-500">Repost</span>
            </button>
            <button className="flex items-center space-x-2 group">
                <div className="p-1 group-hover:bg-blue-50 rounded transition-colors">
                <FiShare2 className="w-5 h-5 group-hover:text-blue-500" />
                </div>
                <span className="group-hover:text-blue-500">Send</span>
            </button>
            </div>
        </div>
        {notification && (
            <Notification type={notification.type} message={notification.message} />
        )}
        {showScheduleModal && (
            <ScheduleModal
            onClose={() => setShowScheduleModal(false)}
            onSchedule={handleSchedule}
            />
        )}
        </div>
    );

    switch (platform.toLowerCase()) {
        case 'twitter':
        return renderTwitterPreview();
        case 'facebook':
        return renderFacebookPreview();
        case 'linkedin':
        return renderLinkedInPreview();
        default:
        return null;
    }
    };