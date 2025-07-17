"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";
import TraitBreakdown from "@/components/TraitBreakdown";

export default function PersonalityTypePage() {
  const params = useParams();
  const router = useRouter();
  const type = params.type as string;
  const personalityType = personalityTypes[type];

  if (!personalityType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Personality Type Not Found</h1>
          <Link href="/personalities" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">Back to All Types</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-20">
        <div className={`bg-gradient-to-br ${personalityType.gradient} rounded-3xl p-6 sm:p-8 text-white mb-6 sm:mb-8 shadow-lg`}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 mb-2">
                <span className="text-base sm:text-lg font-bold">{personalityType.code}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{personalityType.name}</h1>
            </div>
          </div>
          <p className="text-base sm:text-lg opacity-90 mb-4">{personalityType.description}</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Trait Breakdown</h2>
          <TraitBreakdown percentages={{
            mind: personalityType.traits.mind.percentage,
            energy: personalityType.traits.energy.percentage,
            nature: personalityType.traits.nature.percentage,
            tactics: personalityType.traits.tactics.percentage
          }} />
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Strengths & Weaknesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Strengths</h3>
              <ul className="space-y-1 sm:space-y-2">
                {personalityType.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <span className="text-green-500 mt-1">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Areas for Growth</h3>
              <ul className="space-y-1 sm:space-y-2">
                {personalityType.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    <span className="text-red-500 mt-1">•</span>
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {personalityType.careers && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20 dark:border-gray-700/20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Best Careers</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {personalityType.careers.map((career, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium">
                  {career}
                </span>
              ))}
            </div>
          </div>
        )}

        {personalityType.famous && (
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20 dark:border-gray-700/20">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Famous People</h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {personalityType.famous.map((person, index) => (
                <span key={index} className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium">
                  {person}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            href="/personalities"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
          >
            ← Back to All Types
          </Link>
        </div>
      </div>
    </div>
  );
} 