'use client';

import { useState } from 'react';
import { Brain, Zap, Heart, Target, Info } from 'lucide-react';

interface TraitBreakdownProps {
  percentages: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
  };
}

export default function TraitBreakdown({ percentages }: TraitBreakdownProps) {
  const [hoveredTrait, setHoveredTrait] = useState<string | null>(null);

  const traits = [
    {
      key: 'mind',
      icon: Brain,
      title: 'Mind',
      positive: 'Extraverted',
      negative: 'Introverted',
      description: 'How you direct your mental energy',
      tooltip: 'Extraverts focus outward on people and activity, Introverts focus inward on ideas and reflection'
    },
    {
      key: 'energy',
      icon: Zap,
      title: 'Energy',
      positive: 'Intuitive',
      negative: 'Observant',
      description: 'How you take in information',
      tooltip: 'Intuitives focus on patterns and possibilities, Observants focus on facts and details'
    },
    {
      key: 'nature',
      icon: Heart,
      title: 'Nature',
      positive: 'Feeling',
      negative: 'Thinking',
      description: 'How you make decisions',
      tooltip: 'Feelers prioritize harmony and values, Thinkers prioritize logic and consistency'
    },
    {
      key: 'tactics',
      icon: Target,
      title: 'Tactics',
      positive: 'Prospecting',
      negative: 'Judging',
      description: 'How you approach the outside world',
      tooltip: 'Prospectors prefer flexibility and adaptability, Judgers prefer structure and closure'
    }
  ];

  const getTraitName = (trait: any, percentage: number) => {
    return percentage >= 50 ? trait.positive : trait.negative;
  };

  const getGradient = (percentage: number) => {
    if (percentage >= 70) return 'from-green-400 to-emerald-500';
    if (percentage >= 50) return 'from-blue-400 to-cyan-500';
    if (percentage >= 30) return 'from-orange-400 to-yellow-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/20 mb-6 sm:mb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Personality Breakdown</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Hover over each trait to learn more</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {traits.map((trait) => {
          const percentage = percentages[trait.key as keyof typeof percentages];
          const IconComponent = trait.icon;
          const isHovered = hoveredTrait === trait.key;

          return (
            <div
              key={trait.key}
              className="relative group"
              onMouseEnter={() => setHoveredTrait(trait.key)}
              onMouseLeave={() => setHoveredTrait(null)}
            >
              <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 dark:border-gray-600/20 shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200 capitalize">{trait.key}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{trait.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {percentage >= 50 ? trait.positive : trait.negative}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Hover Info */}
                {isHovered && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
                    <div className="bg-gray-900 dark:bg-gray-800 text-white p-3 sm:p-4 rounded-xl shadow-2xl border border-gray-700 max-w-xs">
                      <div className="text-sm sm:text-base font-semibold mb-2">
                        {percentage >= 50 ? trait.positive : trait.negative}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-300">
                        {percentage >= 50 ? trait.tooltip : ''}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}