import React from 'react';
import { FiPlay, FiUser, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const sampleCalls = [
  {
    id: 1,
    title: "Customer Support Call",
    duration: "3:45",
    agent: "Sarah Wilson",
    description: "A perfect example of handling customer inquiries and providing solutions",
    tags: ["Support", "Problem Solving", "Customer Service"],
    rating: 4.8
  },
  {
    id: 2,
    title: "Sales Consultation",
    duration: "5:20",
    agent: "Michael Chen",
    description: "Demonstrating effective sales techniques and product explanations",
    tags: ["Sales", "Product Demo", "Negotiation"],
    rating: 4.9
  },
  {
    id: 3,
    title: "Technical Support",
    duration: "4:15",
    agent: "David Kumar",
    description: "Resolving complex technical issues with clear communication",
    tags: ["Technical", "Troubleshooting", "IT Support"],
    rating: 4.7
  }
];

export const SampleCalls: React.FC = () => {
  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCalls.map((call) => (
          <motion.div
            key={call.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative mb-4">
              <div className="aspect-video bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <FiPlay className="w-8 h-8 text-indigo-600 ml-1" />
                </motion.button>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>{call.duration}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-2">
              {call.title}
            </h3>

            <div className="flex items-center space-x-2 mb-3 text-indigo-600">
              <FiUser className="w-4 h-4" />
              <span className="text-sm">{call.agent}</span>
            </div>

            <p className="text-indigo-600/80 mb-4 text-sm">
              {call.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {call.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-full text-xs font-medium text-indigo-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  {call.rating}
                </span>
                <div className="flex items-center">
                  {"★★★★★".split("").map((star, i) => (
                    <span
                      key={i}
                      className={`text-sm ${
                        i < Math.floor(call.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      {star}
                    </span>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg text-sm font-medium"
              >
                Listen Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};