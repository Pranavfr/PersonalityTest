'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { questions } from '@/data/questions';
import { QuizResponse, calculatePersonalityType, saveQuizProgress, loadQuizProgress, clearQuizProgress } from '@/lib/scoring';
import ProgressBar from '@/components/ProgressBar';
import ModernQuestionCard from '@/components/ModernQuestionCard';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/components/AuthProvider';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load previous progress if exists
    const savedProgress = loadQuizProgress();
    if (savedProgress) {
      setResponses(savedProgress.responses);
      setCurrentQuestionIndex(savedProgress.currentQuestion);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Save progress whenever responses change
    if (!isLoading && responses.length > 0) {
      saveQuizProgress(responses, currentQuestionIndex);
    }
  }, [responses, currentQuestionIndex, isLoading]);

  // Handle quiz completion and redirect
  useEffect(() => {
    if (responses.length === questions.length && !quizCompleted) {
      setQuizCompleted(true);
      const result = calculatePersonalityType(responses);
      clearQuizProgress();
      // Save result to Firestore if user is logged in
      if (user) {
        setDoc(doc(db, "quizResults", user.uid), result).catch(() => {});
      }
      if (result && result.type) {
        router.push(`/result/${result.type}`);
      } else {
        alert('There was a problem calculating your result. Please try again.');
      }
    }
  }, [responses, quizCompleted, user, router]);

  const handleAnswer = (score: number) => {
    const questionId = questions[currentQuestionIndex].id;
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, score } : r);
      } else {
        return [...prev, { questionId, score }];
      }
    });
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 800);
    }
  };

  const getCurrentAnswer = () => {
    const questionId = questions[currentQuestionIndex].id;
    return responses.find(r => r.questionId === questionId)?.score;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-2">
      <Navigation />
      <div className="container mx-auto pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white mb-2">Personality Assessment</h1>
          <p className="text-gray-200">Choose the option that best describes you</p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
        </div>

        {/* Question */}
        <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          <ModernQuestionCard
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentAnswer={getCurrentAnswer()}
            isTransitioning={isTransitioning}
          />
        </div>

        {/* Question Counter */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 dark:border-gray-700/20">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}