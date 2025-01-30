
import { FiPhoneCall } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactCard = () => {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FiPhoneCall className="w-16 h-16 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Experience Our AI Voice Assistant
          </h2>
          
          <p className="text-indigo-600 mb-8 max-w-md mx-auto">
            Connect with our intelligent AI voice assistant by calling us. We're here to help you 24/7!
          </p>

          <motion.a
            href="tel:+91-22-3104-4010"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl font-bold">+91 22 3104 4010</span>
              <span className="text-sm opacity-90">Tap to call</span>
            </div>
          </motion.a>

          <div className="mt-6 text-sm text-gray-500">
            Available round the clock for your assistance
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactCard;