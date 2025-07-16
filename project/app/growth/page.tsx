"use client";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";

export default function GrowthPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Personal Growth by Personality Type
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock your full potential with growth strategies tailored to your personality type.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Object.values(personalityTypes).map((type) => (
            <div key={type.code} className="bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 shadow-2xl mb-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {type.code} - {type.name}
              </h2>
              <p className="text-gray-200 mb-2">
                <b>Growth Strengths:</b> {type.strengths.join(", ")}
              </p>
              <p className="text-gray-200 mb-2">
                <b>Growth Opportunities:</b> {type.weaknesses.slice(0,2).join(", ")}
              </p>
              <p className="text-gray-200 mb-2">
                <b>Tip:</b> {type.name}s can grow by embracing new challenges, learning from others, and practicing self-reflection.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 