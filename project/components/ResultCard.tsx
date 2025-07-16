'use client';

import { PersonalityType } from '@/data/results';
import { Share2, Download, RotateCcw } from 'lucide-react';

interface ResultCardProps {
  personalityType: PersonalityType;
  percentages: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
  };
  onRestart: () => void;
}

export default function ResultCard({ personalityType, percentages, onRestart }: ResultCardProps) {
  const handleShare = async () => {
    const shareData = {
      title: `I'm ${personalityType.name} (${personalityType.code})`,
      text: `I just discovered I'm ${personalityType.name}! Take the personality test to discover your type.`,
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Result copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Result copied to clipboard!');
    }
  };

  const traitLabels = {
    mind: { negative: 'Introverted', positive: 'Extraverted' },
    energy: { negative: 'Observant', positive: 'Intuitive' },
    nature: { negative: 'Thinking', positive: 'Feeling' },
    tactics: { negative: 'Judging', positive: 'Prospecting' }
  };

  const getTraitName = (dimension: keyof typeof traitLabels, percentage: number) => {
    return percentage >= 50 ? traitLabels[dimension].positive : traitLabels[dimension].negative;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className={`bg-gradient-to-br ${personalityType.gradient} rounded-2xl p-8 text-white mb-8`}>
        <div className="text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-4">
            <span className="text-2xl font-bold">{personalityType.code}</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">{personalityType.name}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            {personalityType.description}
          </p>
        </div>
      </div>

      {/* Personality Breakdown */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {Object.entries(percentages).map(([dimension, percentage]) => {
          const trait = getTraitName(dimension as keyof typeof traitLabels, percentage);
          const isPositive = percentage >= 50;
          
          return (
            <div key={dimension} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 capitalize">{dimension}</h3>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
              </div>
              <div className="mb-3">
                <div className="text-lg font-medium text-gray-700 dark:text-gray-300">{trait}</div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">Strengths</h3>
          <ul className="space-y-2">
            {personalityType.strengths.map((strength, index) => (
              <li key={index} className="flex items-center text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full mr-3" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
          <h3 className="text-xl font-bold text-orange-800 dark:text-orange-400 mb-4">Areas for Growth</h3>
          <ul className="space-y-2">
            {personalityType.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center text-orange-700 dark:text-orange-300">
                <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full mr-3" />
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Famous People */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 mb-8">
        <h3 className="text-xl font-bold text-purple-800 dark:text-purple-400 mb-4">Famous {personalityType.code}s</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {personalityType.famous.map((person, index) => (
            <div key={index} className="text-center">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-purple-200 dark:border-purple-700">
                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">{person}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <Share2 size={20} />
          Share Result
        </button>
        
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <RotateCcw size={20} />
          Retake Quiz
        </button>
      </div>
    </div>
  );
}