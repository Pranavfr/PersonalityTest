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
      <div className="container mx-auto max-w-6xl pt-24 sm:pt-28 px-4 sm:px-6">
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
        <div className="text-center py-8 sm:py-12">
          <p className="text-gray-400 text-sm sm:text-base">
            Ready to explore more? Check out other personality types or take the test again!
          </p>
        </div>
      </div>
    </div>
  );
}