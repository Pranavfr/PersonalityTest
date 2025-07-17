"use client";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { personalityTypes } from "@/data/results";
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

export default function PersonalitiesListPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-20">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white drop-shadow-lg mb-6 sm:mb-8">
          Explore All Personality Types
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Object.values(personalityTypes).map((type) => (
            <Link
              key={type.code}
              href={`/personalities/${type.code}`}
              className={`block bg-gradient-to-br ${type.gradient} rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:scale-105 transition-transform`}
              onClick={async () => {
                await trackClick({
                  link: `Personality Type: ${type.code}`,
                  href: `/personalities/${type.code}`,
                  userId: user?.uid || undefined,
                  userEmail: user?.email || undefined,
                });
              }}
            >
              <div className="text-xl sm:text-2xl font-bold mb-2">{type.code}</div>
              <div className="text-lg sm:text-xl font-semibold mb-2">{type.name}</div>
              <div className="text-xs sm:text-sm opacity-90 mb-2">{type.description.slice(0, 80)}...</div>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                {type.strengths.slice(0, 2).map((s, i) => (
                  <span key={i} className="bg-white/30 rounded-full px-2 sm:px-3 py-1 text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 