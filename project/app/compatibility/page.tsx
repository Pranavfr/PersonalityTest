"use client";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

export default function CompatibilityPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Relationship Compatibility by Personality Type
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn how each personality type connects, communicates, and thrives in relationships.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(personalityTypes).map((type) => (
            <div key={type.code} className="bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 shadow-2xl mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {type.code} - {type.name}
              </h2>
              <p className="text-gray-200 mb-2">
                <b>Relationship Strengths:</b> {type.strengths.slice(0,2).join(", ")}
              </p>
              <p className="text-gray-200 mb-2">
                <b>Compatibility:</b> Often gets along well with types who value {type.strengths[0].toLowerCase()} and {type.strengths[1].toLowerCase()}.
              </p>
              <p className="text-gray-200 mb-2">
                <b>Challenges:</b> May struggle with types who are {type.weaknesses[0].toLowerCase()} or {type.weaknesses[1].toLowerCase()}.
              </p>
              <p className="text-gray-200">
                <b>Tip:</b> {type.name}s can build strong relationships by embracing their strengths and communicating openly about differences.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 