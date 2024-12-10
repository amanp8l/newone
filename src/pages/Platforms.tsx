import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { fetchConnectedAccounts, generateJwtToken } from '../services/platformsApi';
import { PlatformCard } from '../components/platforms/PlatformCard';
import { ConnectPlatform } from '../components/platforms/ConnectPlatform';

const platformImages = {
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
  instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
  twitter: 'https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png',
  linkedin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
  tiktok: 'https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png',
  pinterest: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
  youtube: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png',
  telegram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png'
};

export const Platforms: React.FC = () => {
  const { user } = useAuthStore();
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState('');

  useEffect(() => {
    const loadConnectedPlatforms = async () => {
      if (!user?.email || !user?.company) return;

      try {
        const platforms = await fetchConnectedAccounts(user.email, user.company);
        setConnectedPlatforms(platforms);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadConnectedPlatforms();
  }, [user]);

  const handleConnect = async () => {
    if (!user?.email) {
      setError('User email not found');
      return;
    }

    try {
      setError(null);
      const response = await generateJwtToken(user.email);
      
      if (response && response.url) {
        setConnectUrl(response.url);
        window.open(response.url, '_blank');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Error connecting platform:', err);
      setError(err.message || 'Failed to connect platform');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-600">Loading platforms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
            Connected Platforms
          </h1>
          <p className="text-indigo-600">
            Manage your connected social media accounts
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-pink-50 border border-pink-200 rounded-xl text-pink-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {connectedPlatforms.map((platform) => (
            <PlatformCard
              key={platform}
              name={platform.charAt(0).toUpperCase() + platform.slice(1)}
              image={platformImages[platform as keyof typeof platformImages]}
              onClick={() => {}}
            />
          ))}
          
          <PlatformCard
            isAddNew
            isFirstPlatform={connectedPlatforms.length === 0}
            onClick={handleConnect}
          />
        </div>
      </div>

      {showConnectModal && connectUrl && (
        <ConnectPlatform
          url={connectUrl}
          onClose={() => setShowConnectModal(false)}
        />
      )}
    </div>
  );
};