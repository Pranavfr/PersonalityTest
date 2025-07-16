"use client";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

export default function CareersPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Career Guidance by Personality Type
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the best career paths and work environments for your unique personality type.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(personalityTypes).map((type) => (
            <div key={type.code} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {type.code} - {type.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <b>Strengths:</b> {type.strengths.join(", ")}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <b>Ideal Careers:</b> Careers that leverage {type.strengths[0].toLowerCase()} and {type.strengths[1].toLowerCase()} such as ...
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <b>Work Environment:</b> {type.name}s thrive in environments that value {type.strengths[0].toLowerCase()} and {type.strengths[2].toLowerCase()}.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <b>Tip:</b> {type.name}s should seek roles that allow them to use their natural talents and be mindful of their {type.weaknesses[0].toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 