import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ConnectedPlatforms {
  [key: string]: string[];
}

const platformIcons: { [key: string]: string } = {
  facebook: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
  instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
  twitter: 'https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg',
  linkedin: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png',
  tiktok: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Ionicons_logo-tiktok.svg',
  pinterest: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
  youtube: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png',
  telegram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png',
  reddit: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Reddit_logo.png',
  google: 'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=595&height=400&name=image8-2.jpg'
};

const allPlatforms = Object.keys(platformIcons);

const apiService = {
  baseUrl: 'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/api',

  getAuthHeaders() {
    const jwtToken = Cookies.get('jwt_token');
    if (!jwtToken) {
      throw new Error('No JWT token found');
    }
    return {
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    };
  },

  async fetchConnectedAccounts() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/fetch_connected_accounts`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch connected accounts');
    }
  },

  async generatePlatformToken(brandName: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/generate_jwt_token`,
        { brand_name: brandName },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to generate platform token');
    }
  }
};

export const Platforms: React.FC = () => {
  const navigate = useNavigate();
  const [connectedPlatforms, setConnectedPlatforms] = useState<ConnectedPlatforms>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await apiService.fetchConnectedAccounts();
        if (response.result) {
          setConnectedPlatforms(response.result);
        }
      } catch (err: any) {
        console.error('Error fetching platforms:', err);
        setError(err.message);
        if (err.message.includes('unauthorized') || err.message.includes('jwt')) {
          Cookies.remove('jwt_token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, [navigate]);

  const handleConnectMore = async (brandName: string) => {
    try {
      const response = await apiService.generatePlatformToken(brandName);
      if (response.url) {
        window.open(response.url, '_blank');
      }
    } catch (err: any) {
      console.error('Error connecting platform:', err);
      setError(err.message);
      if (err.message.includes('unauthorized') || err.message.includes('jwt')) {
        Cookies.remove('jwt_token');
        navigate('/login');
      }
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

  const renderPlatformGrid = (connectedPlatformsList: string[]) => {
    const sortedPlatforms = [...allPlatforms].sort((a, b) => {
      const aConnected = connectedPlatformsList.includes(a) ? 1 : 0;
      const bConnected = connectedPlatformsList.includes(b) ? 1 : 0;
      return bConnected - aConnected;
    });

    return (
      <div className="grid grid-cols-10 gap-0">
        {sortedPlatforms.map((platform) => {
          const isConnected = connectedPlatformsList.includes(platform);
          return (
            <div
              key={platform}
              className="aspect-square rounded-xl p-2 flex items-center justify-center group/platform transition-all duration-300 relative"
            >
              <div
                className={`w-full h-full rounded-xl p-2 flex items-center justify-center ${
                  isConnected
                    ? 'bg-gradient-to-br from-indigo-50 to-pink-50 hover:scale-105'
                    : 'bg-gray-50 opacity-40 hover:opacity-60'
                }`}
              >
                <img
                  src={platformIcons[platform]}
                  alt={platform}
                  className="w-full h-full object-contain"
                />
              </div>
              {isConnected && (
                <div className="absolute -top-1 -right-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ●
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
        </div>

        {error && (
          <div className="mb-8 p-4 bg-pink-50 border border-pink-200 rounded-xl text-pink-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {Object.keys(connectedPlatforms).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full"
            >
              <button
                onClick={() => navigate('/brands')}
                className="w-full h-80 bg-white rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <FiPlus className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-2">Connect First Brand</h3>
                  <p className="text-indigo-600">Get started by adding your first brand</p>
                </div>
              </button>
            </motion.div>
          ) : (
            Object.entries(connectedPlatforms).map(([brandName, platforms], index) => (
              <motion.div
                key={brandName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:to-pink-50/50 transition-all duration-500" />
                  
                  <div className="relative space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                      {brandName}
                    </h3>

                    <div>
                      <h4 className="text-sm font-medium text-indigo-900 mb-4">Available Platforms</h4>
                      {renderPlatformGrid(platforms)}
                    </div>

                    <button
                      onClick={() => handleConnectMore(brandName)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2 group/button"
                    >
                      <span>Connect More Platforms</span>
                      <FiArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Platforms;