'use client';

import { useState } from 'react';
import { MessageCircle, X, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    {
      title: "First time here?",
      message: "Take our free personality test to discover your unique type and unlock personalized insights!",
      cta: "Start Test",
      href: "/quiz"
    },
    {
      title: "Need help choosing?",
      message: "Not sure which personality type fits you? Our test uses proven psychology to give you accurate results.",
      cta: "Learn More",
      href: "/about"
    },
    {
      title: "Already took the test?",
      message: "View your results anytime or retake the test to see how you've grown and changed.",
      cta: "View Results",
      href: "/result"
    }
  ];

  const currentTipData = tips[currentTip];

  return (
    <>
      {/* Floating Button with floating and pulse animation */}
      <motion.button
        animate={{ y: [0, -8, 0], boxShadow: [
          '0 4px 24px 0 rgba(167,139,250,0.25)',
          '0 8px 32px 0 rgba(236,72,153,0.25)',
          '0 4px 24px 0 rgba(167,139,250,0.25)'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isOpen ? 'scale-110' : 'hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
        )}
      </motion.button>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Personality Assistant</h3>
                <p className="text-xs opacity-90">Here to help you discover yourself</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {currentTipData.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {currentTipData.message}
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={currentTipData.href}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 mb-4"
            >
              {currentTipData.cta}
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Tip Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {tips.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTip(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTip 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrentTip((prev) => (prev + 1) % tips.length)}
                className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
              >
                Next tip →
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50/50 dark:bg-gray-800/50">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Actions:</div>
            <div className="flex gap-2">
              <a
                href="/faq"
                className="flex-1 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-200 dark:border-gray-600 text-center"
              >
                FAQ
              </a>
              <a
                href="mailto:codesentinel.tech@gmail.com"
                className="flex-1 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-xs font-medium transition-colors border border-gray-200 dark:border-gray-600 text-center"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}