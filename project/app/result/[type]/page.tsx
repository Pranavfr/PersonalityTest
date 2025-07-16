'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { personalityTypes } from '@/data/results';
import { loadQuizResult, clearQuizProgress } from '@/lib/scoring';
import PersonalityHero from '@/components/PersonalityHero';
import TraitBreakdown from '@/components/TraitBreakdown';
import PersonalityInsights from '@/components/PersonalityInsights';
import LifestyleRecommendations from '@/components/LifestyleRecommendations';
import FamousPeople from '@/components/FamousPeople';
import ShareAndActions from '@/components/ShareAndActions';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedResult = loadQuizResult();
    
    if (savedResult && savedResult.type === params.type) {
      setResult(savedResult);
    } else if (params.type && personalityTypes[params.type as string]) {
      // If no saved result but valid type, show type info with default percentages
      setResult({
        type: params.type,
        percentages: {
          mind: 65,
          energy: 70,
          nature: 75,
          tactics: 60
        }
      });
    } else {
      // Invalid type or no result, redirect to home
      router.push('/');
      return;
    }
    
    setIsLoading(false);
  }, [params.type, router]);

  const handleRestart = () => {
    clearQuizProgress();
    localStorage.removeItem('personalityQuiz_result');
    router.push('/quiz');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-xl text-gray-600 dark:text-gray-400">Loading your results...</div>
        </div>
      </div>
    );
  }

  if (!result || !personalityTypes[result.type]) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Result Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">We couldn't find your personality test result.</p>
          <Link
            href="/quiz"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Take the Quiz
          </Link>
        </div>
      </div>
    );
  }

  const personalityType = personalityTypes[result.type];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-6xl pt-24">
        {/* Hero Section */}
        <PersonalityHero personalityType={personalityType} />

        {/* Trait Breakdown */}
        <TraitBreakdown percentages={result.percentages} />

        {/* Deep Insights */}
        <PersonalityInsights personalityType={personalityType} />

        {/* Lifestyle Recommendations */}
        <LifestyleRecommendations personalityType={personalityType} />

        {/* Famous People */}
        <FamousPeople personalityType={personalityType} />

        {/* Share and Actions */}
        <ShareAndActions
          personalityType={personalityType}
          percentages={result.percentages}
          onRestart={handleRestart}
        />

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 dark:border-gray-700/20">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Continue Your Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Understanding your personality is just the beginning. Use these insights to grow, 
              build better relationships, and make decisions that align with your authentic self.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl font-medium transition-colors border border-gray-200 dark:border-gray-700"
              >
                Back to Home
              </Link>
              <button
                onClick={handleRestart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Explore Another Type
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}