'use client';

import { PersonalityType } from '@/data/results';
import { Sparkles, Quote } from 'lucide-react';

interface PersonalityHeroProps {
  personalityType: PersonalityType;
}

export default function PersonalityHero({ personalityType }: PersonalityHeroProps) {
  const quotes = {
    INTJ: "The future belongs to those who prepare for it today.",
    INTP: "Logic will get you from A to B. Imagination will take you everywhere.",
    ENTJ: "The way to get started is to quit talking and begin doing.",
    ENTP: "Innovation distinguishes between a leader and a follower.",
    INFJ: "Be yourself; everyone else is already taken.",
    INFP: "The best way to find out if you can trust somebody is to trust them.",
    ENFJ: "A person's worth is measured by the worth of what he values.",
    ENFP: "Nothing great was ever achieved without enthusiasm.",
    ISTJ: "Success is where preparation and opportunity meet.",
    ISFJ: "No act of kindness, no matter how small, is ever wasted.",
    ESTJ: "The way to get things done is not to mind who gets the credit.",
    ESFJ: "Alone we can do so little; together we can do so much.",
    ISTP: "I have not failed. I've just found 10,000 ways that won't work.",
    ISFP: "The purpose of art is washing the dust of daily life off our souls.",
    ESTP: "Life is either a daring adventure or nothing at all.",
    ESFP: "Life is a party. Dress like it."
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${personalityType.gradient} rounded-3xl p-8 md:p-12 text-white mb-8`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full -translate-x-12 -translate-y-12" />
      </div>

      <div className="relative z-10">
        {/* Type Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/30">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <span className="text-3xl font-bold tracking-wider">{personalityType.code}</span>
            </div>
          </div>
        </div>

        {/* Character Illustration Placeholder */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{personalityType.name}</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-3xl mx-auto leading-relaxed">
            {personalityType.description}
          </p>

          {/* Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <Quote className="w-6 h-6 mx-auto mb-3 opacity-70" />
            <p className="text-lg italic font-medium">
              "{quotes[personalityType.code as keyof typeof quotes]}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}