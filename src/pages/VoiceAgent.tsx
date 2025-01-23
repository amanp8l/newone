import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SampleCalls } from '../components/voice-agent/SampleCalls';
import { OutboundCall } from '../components/voice-agent/OutboundCall';
import { InboundCall } from '../components/voice-agent/InboundCall';

type Tab = 'sample' | 'outbound' | 'inbound';

export const VoiceAgent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('sample');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sample', label: 'Sample Calls' },
    { id: 'outbound', label: 'Outbound Call' },
    { id: 'inbound', label: 'Inbound Call' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50">
      {/* Header */}
      <div className="p-4">
      </div>

      {/* Tabs */}
      <div className="px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-indigo-600 hover:text-indigo-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl"
                    initial={false}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'sample' && <SampleCalls />}
          {activeTab === 'outbound' && <OutboundCall />}
          {activeTab === 'inbound' && <InboundCall />}
        </motion.div>
      </div>
    </div>
  );
};