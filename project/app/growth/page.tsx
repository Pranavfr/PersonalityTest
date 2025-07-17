"use client";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";

export default function GrowthPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 mt-16 sm:mt-20">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            Personal Growth by Personality Type
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock your full potential with growth strategies tailored to your personality type.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {Object.values(personalityTypes).map((type) => (
            <div key={type.code} className="bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-purple-400/30 shadow-2xl mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                {type.code} - {type.name}
              </h2>
              <p className="text-gray-200 mb-2 sm:mb-3 text-sm sm:text-base">
                <b>Growth Strengths:</b> {type.strengths.join(", ")}
              </p>
              <p className="text-gray-200 mb-2 sm:mb-3 text-sm sm:text-base">
                <b>Growth Opportunities:</b> {type.weaknesses.slice(0,2).join(", ")}
              </p>
              <p className="text-gray-200 mb-2 sm:mb-3 text-sm sm:text-base">
                <b>Tip:</b> {type.name}s can grow by embracing new challenges, learning from others, and practicing self-reflection.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 