import { useState } from 'react';
import axios from 'axios';
import { FiPhone, FiX, FiMic, FiGlobe, FiUser, FiMessageCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';


const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+81', country: 'Japan' },
  { code: '+86', country: 'China' },
  { code: '+49', country: 'Germany' },
];

export const OutboundCall = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleNumberClick = (num: string) => {
    setPhoneNumber(prev => prev + num);
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCall = async () => {
    if (phoneNumber && username) {
      try {
        const jwtToken = Cookies.get('jwt_token');
        if (!jwtToken) {
        throw new Error('No JWT token found');
        }
        const response = await axios.post(
          'https://kimchi-new.yellowpond-c706b9da.westus2.azurecontainerapps.io/call_users', 
          [{ 
            phone_number: `${selectedCountry.code}${phoneNumber}`, 
            username: username 
          }],
          {
            headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.message === "Calls initiated successfully") {
          alert('Call Initiated Successfully!');
          setIsCallActive(true);
        }
      } catch (error) {
        alert('Failed to Initiate Call');
        console.error('Call initiation error:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="relative mb-6">
              <button
                onClick={() => setShowCountryList(!showCountryList)}
                className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <FiGlobe className="w-5 h-5 text-indigo-600" />
                  <span className="text-indigo-900 font-medium">{selectedCountry.country}</span>
                  <span className="text-indigo-600">{selectedCountry.code}</span>
                </div>
                <motion.div animate={{ rotate: showCountryList ? 180 : 0 }}>▼</motion.div>
              </button>

              <AnimatePresence>
                {showCountryList && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg max-h-60 overflow-y-auto"
                  >
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryList(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 transition-colors flex items-center justify-between"
                      >
                        <span className="text-indigo-900">{country.country}</span>
                        <span className="text-indigo-600">{country.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl mb-6">
              <input 
                type="text" 
                placeholder="Enter Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-indigo-900 text-2xl font-medium text-center placeholder-indigo-600 focus:outline-none"
              />
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl mb-6">
              <div className="text-2xl font-medium text-indigo-900 text-center">
                {selectedCountry.code} {phoneNumber || 'Enter Phone Number'}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num.toString())}
                  className="aspect-square bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl flex items-center justify-center text-xl font-medium text-indigo-900 hover:from-indigo-100 hover:to-pink-100 transition-colors"
                >
                  {num}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="p-4 bg-pink-50 text-pink-500 rounded-xl hover:bg-pink-100 transition-colors"
              >
                <FiX className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCall}
                disabled={!phoneNumber || !username}
                className={`px-8 py-4 rounded-xl flex items-center space-x-2 ${
                  phoneNumber && username
                    ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiPhone className="w-6 h-6" />
                <span className="font-medium">Call</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-indigo-50 text-indigo-500 rounded-xl hover:bg-indigo-100 transition-colors"
              >
                <FiMic className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-96">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-900">AI Voice Agent</h3>
              <p className="text-indigo-600 text-sm mt-2">Available 24/7</p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <FiMessageCircle className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-indigo-900">Natural Conversation</h4>
                </div>
                <p className="text-indigo-600 text-sm">
                  Engages in natural, context-aware dialogue with advanced understanding
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <FiPhone className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-indigo-900">Smart Call Handling</h4>
                </div>
                <p className="text-indigo-600 text-sm">
                  Handles various scenarios professionally with real-time adaptation
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center space-x-3 mb-2">
                  <FiMic className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-indigo-900">Call Summary</h4>
                </div>
                <p className="text-indigo-600 text-sm">
                  Provides detailed call notes and action items after each conversation
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isCallActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiPhone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-indigo-900 mb-2">
                  Calling {selectedCountry.code} {phoneNumber}
                </h3>
                <p className="text-indigo-600 mb-6">
                  AI Voice Agent is initiating the call...
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCallActive(false)}
                  className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
                >
                  End Call
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OutboundCall;