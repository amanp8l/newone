    import React, { useState } from 'react';
    import { FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiThumbsUp, FiFile, FiSend, FiLoader, FiCheck } from 'react-icons/fi';
    import { PreviewPlatformContent } from '../../utils/previewFormatter';
    import axios from 'axios';
    import { useAuthStore } from '../../store/authStore';

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

    export const PlatformPreview: React.FC<PlatformPreviewProps> = ({
    platform,
    content,
    companyName,
    image,
    video,
    pdf
    }) => {
    const { user } = useAuthStore();
    const [isPublishing, setIsPublishing] = useState(false);
    const [notification, setNotification] = useState<NotificationProps | null>(null);

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
        
        // Convert base64 image to URL if image exists and is base64
        if (image && image.startsWith('data:')) {
            try {
            const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/generate_url_for_image', {
                b64_string: image.split(',')[1]
            });
            console.log(response.data)
            imageUrl = response.data;
            } catch (error) {
            console.error('Error converting image:', error);
            showNotification('error', 'Failed to process image');
            setIsPublishing(false);
            return;
            }
        }

        // Prepare API payload
        const payload = {
            user_email: user.email,
            platform: platform.toLowerCase(),
            post: formattedContent,
            ...(imageUrl || image ? { media_url: [imageUrl || image] } : {})
        };

        const response = await axios.post('https://marketing-agent.delightfulflower-b5c85228.eastus2.azurecontainerapps.io/api/post_to_social_media', payload);

        if (response.status === 200) {
            showNotification('success', 'Post successfully published!');
        }
        } catch (error: any) {
        showNotification('error', 'Failed to publish post. Please try again.');
        } finally {
        setIsPublishing(false);
        }
    };

    // Format content for the specific platform, ensure content is string
    const safeContent = typeof content === 'string' ? content : '';
    const formattedContent = PreviewPlatformContent(safeContent);

    const PublishButton = () => (
        <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center space-x-2 shadow-sm"
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
    );

    const renderTwitterPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        <PublishButton />
        {/* Rest of the Twitter preview code remains the same */}
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
                <div
                className="mt-2 text-gray-900"
                dangerouslySetInnerHTML={{ __html: formattedContent }}
                />
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
        </div>
    );

    const renderFacebookPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        <PublishButton />
        {/* Rest of the Facebook preview code remains the same */}
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
            <div
            className="text-gray-900"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
            {image && (
            <div className="mt-3 -mx-4 border-t border-b border-gray-100">
                <img src={image} alt="Post" className="w-full h-auto" />
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
        </div>
    );

    const renderLinkedInPreview = () => (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        <PublishButton />
        {/* Rest of the LinkedIn preview code remains the same */}
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
            <div className="text-gray-900">{formattedContent}</div>
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