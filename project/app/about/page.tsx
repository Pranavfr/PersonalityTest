'use client';

import Navigation from '@/components/Navigation';
import { Brain, Users, Target, Lightbulb, CheckCircle, BarChart3, Book, Heart } from 'lucide-react';
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

export default function AboutPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            About Personality Types
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow mb-8 max-w-3xl mx-auto leading-relaxed">
            Understanding the science and psychology behind personality assessment
          </p>
        </div>

        {/* What Are Personality Types */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">What Are Personality Types?</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Personality types are psychological classifications that help us understand how people perceive the world, 
            make decisions, and interact with others. Our assessment is based on the Myers-Briggs Type Indicator (MBTI) 
            framework, which identifies 16 distinct personality types.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Each type is determined by four key dimensions: how you direct your energy (Extraversion vs Introversion), 
            how you take in information (Sensing vs Intuition), how you make decisions (Thinking vs Feeling), 
            and how you approach the outside world (Judging vs Perceiving).
          </p>
        </div>

        {/* The Four Dimensions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Mind (E/I)</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Extraverts (E)</strong> focus outward on people and activity, gaining energy from interaction. 
              <strong>Introverts (I)</strong> focus inward on ideas and reflection, needing quiet time to recharge.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Energy (S/N)</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Sensors (S)</strong> focus on facts, details, and present realities. 
              <strong>Intuitives (N)</strong> focus on patterns, possibilities, and future potential.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Nature (T/F)</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Thinkers (T)</strong> make decisions based on logic and objective analysis. 
              <strong>Feelers (F)</strong> make decisions based on values and consideration for people.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Tactics (J/P)</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <strong>Judgers (J)</strong> prefer structure, closure, and decided matters. 
              <strong>Perceivers (P)</strong> prefer flexibility, openness, and adaptability.
            </p>
          </div>
        </div>

        {/* How Our Test Works */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">How Our Test Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">54</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Questions</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Carefully crafted questions covering all four personality dimensions
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">7</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Point Scale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                From "Strongly Disagree" to "Strongly Agree" for nuanced responses
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">16</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Types</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive results covering all possible personality combinations
              </p>
            </div>
          </div>
        </div>

        {/* Scientific Foundation */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Scientific Foundation</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Our personality assessment is based on decades of psychological research, starting with Carl Jung's 
            theory of psychological types and further developed by Katharine Cook Briggs and Isabel Briggs Myers. 
            The framework has been refined through extensive research and validation studies.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            While personality types provide valuable insights, it's important to remember that they are tools 
            for understanding, not rigid categories. People are complex and can exhibit traits from multiple 
            types depending on the situation and their personal growth journey.
          </p>
        </div>
      </div>
    </div>
  );
}