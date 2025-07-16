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
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Personality Breakdown</h2>
        <p className="text-gray-600 dark:text-gray-400">Hover over each trait to learn more</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:scale-105">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${getGradient(percentage)}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{trait.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{trait.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{percentage}%</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {getTraitName(trait, percentage)}
                    </div>
                  </div>
                </div>

                {/* Progress Circle */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                      className="transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`${getGradient(percentage).split(' ')[0].replace('from-', 'text-')}`} />
                        <stop offset="100%" className={`${getGradient(percentage).split(' ')[1].replace('to-', 'text-')}`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-200">{percentage}%</span>
                  </div>
                </div>

                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-10">
                    <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg px-4 py-2 max-w-xs text-center">
                      <Info className="w-4 h-4 inline mr-1" />
                      {trait.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
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