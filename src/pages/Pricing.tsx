import React, { useState } from 'react';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlight?: boolean;
}

export const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: Plan[] = [
    {
      name: 'Individual',
      description: 'Perfect for freelancers and individuals',
      monthlyPrice: 20,
      yearlyPrice: 15,
      features: [
        'All AI content generation tools',
        'Up to 50 posts per month',
        'Basic analytics',
        'Email support',
        '1 social media account per platform'
      ]
    },
    {
      name: 'Team',
      description: 'Great for small teams and businesses',
      monthlyPrice: 50,
      yearlyPrice: 30,
      features: [
        'Everything in Individual, plus:',
        'Up to 200 posts per month',
        'Advanced analytics',
        'Priority support',
        '5 team members',
        '3 social media accounts per platform'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 200,
      yearlyPrice: 150,
      features: [
        'Everything in Team, plus:',
        'Unlimited posts',
        'Custom AI model training',
        'Dedicated account manager',
        'Unlimited team members',
        'Unlimited social media accounts'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent mb-4"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-indigo-600"
          >
            Get started with the perfect plan for your needs
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-full p-1 shadow-sm inline-flex">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-colors ${
                !isYearly ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white' : 'text-indigo-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition-colors ${
                isYearly ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white' : 'text-indigo-600'
              }`}
            >
              Yearly
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:scale-105 group ${
                plan.highlight ? 'shadow-xl' : 'shadow-lg'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-sm rounded-full">
                  Most Popular
                </div>
              )}

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition-opacity rounded-2xl" />
                <div className="relative bg-white rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-indigo-900 mb-2">{plan.name}</h3>
                  <p className="text-indigo-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-indigo-900">
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-indigo-600">/month</span>
                    {isYearly && (
                      <div className="text-pink-500 text-sm mt-2">
                        Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12} yearly
                      </div>
                    )}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-indigo-900">
                        <FiCheck className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl hover:from-indigo-600 hover:to-pink-600 transition-colors flex items-center justify-center space-x-2 group">
                    <span>Get Started</span>
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};