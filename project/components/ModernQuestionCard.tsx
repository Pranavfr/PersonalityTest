'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/data/questions';
import { ThumbsDown, ThumbsUp, Minus } from 'lucide-react';

interface ModernQuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  currentAnswer?: number;
  isTransitioning?: boolean;
}

export default function ModernQuestionCard({ question, onAnswer, currentAnswer, isTransitioning }: ModernQuestionCardProps) {
  const [selectedScore, setSelectedScore] = useState<number>(currentAnswer || 0);
  const [hoveredScore, setHoveredScore] = useState<number>(0);

  useEffect(() => {
    setSelectedScore(currentAnswer || 0);
  }, [currentAnswer, question.id]);

  const handleScoreSelect = (score: number) => {
    if (isTransitioning) return;
    setSelectedScore(score);
    onAnswer(score);
  };

  const scaleOptions = [
    { value: 1, label: "Strongly Disagree", color: "from-red-500 to-red-600", icon: ThumbsDown },
    { value: 2, label: "Disagree", color: "from-orange-500 to-red-500", icon: ThumbsDown },
    { value: 3, label: "Slightly Disagree", color: "from-yellow-500 to-orange-500", icon: ThumbsDown },
    { value: 4, label: "Neutral", color: "from-gray-400 to-gray-500", icon: Minus },
    { value: 5, label: "Slightly Agree", color: "from-lime-500 to-yellow-500", icon: ThumbsUp },
    { value: 6, label: "Agree", color: "from-green-500 to-lime-500", icon: ThumbsUp },
    { value: 7, label: "Strongly Agree", color: "from-emerald-500 to-green-500", icon: ThumbsUp }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#18192a]/90 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12 border border-purple-400/30">
        {/* Question Text */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-xs sm:text-sm font-bold mb-3 sm:mb-4 uppercase tracking-wider">
            QUESTION {question.id}
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 sm:mb-6 leading-relaxed px-2">
            {question.text}
          </h2>
        </div>

        {/* Modern Horizontal Scale */}
        <div className="space-y-4 sm:space-y-6">
          {/* Scale Labels */}
          <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-gray-300 px-2 sm:px-4">
            <span className="flex items-center gap-1 sm:gap-2">
              <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Disagree</span>
              <span className="sm:hidden">No</span>
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Neutral</span>
              <span className="sm:hidden">Maybe</span>
            </span>
            <span className="flex items-center gap-1 sm:gap-2">
              <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Agree</span>
              <span className="sm:hidden">Yes</span>
            </span>
          </div>

          {/* Interactive Scale */}
          <div className="relative">
            {/* Background Track */}
            <div className="h-2 sm:h-3 bg-gradient-to-r from-purple-900 via-[#232946] to-blue-900 rounded-full" />
            
            {/* Scale Points */}
            <div className="absolute inset-0 flex justify-between items-center px-1">
              {scaleOptions.map((option) => {
                const isSelected = selectedScore === option.value;
                const isHovered = hoveredScore === option.value;
                const IconComponent = option.icon;
                
                return (
                  <button
                    key={option.value}
                    onClick={() => handleScoreSelect(option.value)}
                    onMouseEnter={() => setHoveredScore(option.value)}
                    onMouseLeave={() => setHoveredScore(0)}
                    disabled={isTransitioning}
                    className={`relative group transition-all duration-300 touch-manipulation ${
                      isTransitioning ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                  >
                    {/* Scale Point */}
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 transition-all duration-300 ${
                      isSelected 
                        ? `bg-gradient-to-r ${option.color} border-purple-400 shadow-lg scale-125` 
                        : isHovered
                        ? 'bg-[#232946] border-purple-400 scale-110'
                        : 'bg-[#232946] border-purple-400 hover:scale-110'
                    }`}>
                      {isSelected && (
                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>

                    {/* Tooltip */}
                    <div className={`absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 transition-all duration-200 ${
                      isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      <div className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white shadow-lg ${
                        isSelected ? `bg-gradient-to-r ${option.color}` : 'bg-gray-800 dark:bg-gray-700'
                      }`}>
                        <span className="hidden sm:inline">{option.label}</span>
                        <span className="sm:hidden">{option.value}</span>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-gray-700" />
                      </div>
                    </div>

                    {/* Value Label */}
                    <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400">
                      {option.value}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Option Display */}
          {selectedScore > 0 && (
            <div className="text-center mt-6 sm:mt-8">
              <div className={`inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-2xl text-white font-bold bg-gradient-to-r ${
                scaleOptions.find(opt => opt.value === selectedScore)?.color || 'from-gray-400 to-gray-500'
              } shadow-lg text-sm sm:text-base`}>
                {scaleOptions.find(opt => opt.value === selectedScore)?.label}
              </div>
            </div>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="text-xs sm:text-sm text-gray-400 font-semibold">
            {selectedScore > 0 ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                ✓ Moving to next question...
              </span>
            ) : (
              'Select your response above'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}