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
      <div className="container mx-auto max-w-3xl">
        <div className={`bg-gradient-to-br ${personalityType.gradient} rounded-3xl p-8 text-white mb-8 shadow-lg`}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-2">
                <span className="text-lg font-bold">{personalityType.code}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{personalityType.name}</h1>
            </div>
          </div>
          <p className="text-lg opacity-90 mb-4">{personalityType.description}</p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Trait Breakdown</h2>
          <TraitBreakdown percentages={{
            mind: personalityType.traits.mind.percentage,
            energy: personalityType.traits.energy.percentage,
            nature: personalityType.traits.nature.percentage,
            tactics: personalityType.traits.tactics.percentage
          }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Strengths</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {personalityType.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Weaknesses</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {personalityType.weaknesses.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 dark:border-gray-700/20">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Famous People with this Personality</h3>
          <div className="flex flex-wrap gap-2">
            {personalityType.famous.map((f, i) => (
              <span key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Educational Section */}
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20 dark:border-gray-700/20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">About {personalityType.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {personalityType.name} ({personalityType.code}) personalities are known for their {personalityType.strengths.slice(0,2).join(" and ")}. They often excel in environments where {personalityType.strengths[0].toLowerCase()} is valued, but may struggle with {personalityType.weaknesses[0].toLowerCase()}.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <b>Growth Tips:</b> Embrace your strengths, but also be mindful of your weaknesses. {personalityType.name}s can benefit from seeking balance, practicing self-awareness, and learning from others with different perspectives.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <b>Relationships:</b> In relationships, {personalityType.name}s are often {personalityType.strengths[1].toLowerCase()} and {personalityType.strengths[2].toLowerCase()}. They may find it challenging to connect with those who are {personalityType.weaknesses[1].toLowerCase()} or {personalityType.weaknesses[2].toLowerCase()}, but with open communication, they can build strong, meaningful bonds.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <b>Career:</b> {personalityType.name}s thrive in careers that allow them to use their {personalityType.strengths[0].toLowerCase()} and {personalityType.strengths[1].toLowerCase()}. They may want to avoid roles that require them to constantly confront their weaknesses, but stepping out of their comfort zone can lead to personal and professional growth.
          </p>
        </div>

        <div className="text-center mt-8">
          <Link href="/personalities" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Back to All Types
          </Link>
        </div>
      </div>
    </div>
  );
} 