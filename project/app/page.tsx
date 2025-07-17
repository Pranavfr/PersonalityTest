'use client';

import Navigation from '@/components/Navigation';
import { Sparkles, User, BarChart3, Lightbulb, Users, Star, ArrowRight, Instagram } from 'lucide-react';
import FloatingAssistant from '@/components/FloatingAssistant';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
// Placeholder Lottie imports (replace with your own files)
// import heroAvatar from '@/public/lotties/hero-avatar.json';
// import assistantLottie from '@/public/lotties/assistant.json';
// import typeIntj from '@/public/lotties/type-intj.json';
// import typeEnfp from '@/public/lotties/type-enfp.json';
// import typeIstp from '@/public/lotties/type-istp.json';
// import typeInfj from '@/public/lotties/type-infj.json';
// import testimonialMale from '@/public/lotties/testimonial-male.json';
// import testimonialFemale from '@/public/lotties/testimonial-female.json';
import BrainBackground from '@/components/BrainBackground';
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

const steps = [
  {
    icon: Sparkles,
    title: 'Start Test',
    desc: 'Answer 54 quick questions to reveal your unique personality type.'
  },
  {
    icon: BarChart3,
    title: 'View Results',
    desc: 'See your detailed personality breakdown and type instantly.'
  },
  {
    icon: Lightbulb,
    title: 'Unlock Insights',
    desc: 'Get tailored growth tips, compatibility, and career advice.'
  }
];

const testimonials = [
  {
    name: 'Alex Kim',
    type: 'INTJ',
    gender: 'male',
    quote: 'This test gave me insights I never found anywhere else. The results felt spot on!'
  },
  {
    name: 'Priya Singh',
    type: 'ENFP',
    gender: 'female',
    quote: 'The assistant tips are so helpful and the UI is beautiful. Highly recommended.'
  },
  {
    name: 'Jordan Lee',
    type: 'ISTP',
    gender: 'male',
    quote: 'I loved the glassmorphism cards and the smooth experience. Very premium feel.'
  }
];

const personalityTypes = [
  { code: 'INTJ', name: 'Architect', icon: User },
  { code: 'ENFP', name: 'Campaigner', icon: Users },
  { code: 'ISTP', name: 'Virtuoso', icon: Star },
  { code: 'INFJ', name: 'Advocate', icon: Lightbulb },
  // ...add more types as needed
];

export default function Home() {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    // Increment click count on each visit
    const count = parseInt(localStorage.getItem('siteClickCount') || '0', 10) + 1;
    localStorage.setItem('siteClickCount', count.toString());
    setClickCount(count);
  }, []);

  // Carousel logic
  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      <BrainBackground />
      <Navigation />
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-32 min-h-[60vh]">
        {/* Aurora background restored */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-pink-900/30 blur-2xl pointer-events-none" />
        <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 md:p-12 border border-purple-400/30 shadow-2xl text-center animate-fade-in flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Discover Your <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">True Self</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 font-semibold">
            Take our comprehensive 54-question personality assessment and unlock deep insights about your unique strengths, preferences, and growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg">
            <Link
              href="/quiz"
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[56px]"
              onClick={async () => {
                await trackClick({
                  link: 'Start Test',
                  href: '/quiz',
                  userId: user?.uid || undefined,
                  userEmail: user?.email || undefined,
                });
              }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              Start Test
            </Link>
            <Link
              href="/personalities"
              className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 border border-white/20 flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[56px]"
              onClick={async () => {
                await trackClick({
                  link: 'Explore Types',
                  href: '/personalities',
                  userId: user?.uid || undefined,
                  userEmail: user?.email || undefined,
                });
              }}
            >
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              Explore Types
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 animate-fade-in-up">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            How It <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto">
            Our scientifically-backed assessment helps you understand your personality type and unlock your potential.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-400/30 shadow-2xl text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <step.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
              <p className="text-gray-200 text-sm sm:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personality Types Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 animate-fade-in-up w-full">
        <div className="w-full flex justify-center mb-6 sm:mb-8 md:mb-10">
          <div className="bg-[#18192a]/90 rounded-2xl p-4 sm:p-6 border border-purple-400/30 shadow-2xl flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-center m-0">Explore Personality Types</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full">
          {personalityTypes.map((type, i) => (
            <div
              key={i}
              className="bg-[#18192a]/90 rounded-2xl p-4 sm:p-6 border border-purple-400/30 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 flex flex-col items-center text-center"
            >
              <type.icon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mb-3" />
              <div className="text-lg sm:text-xl font-bold text-white mb-1">{type.code}</div>
              <div className="text-sm sm:text-base text-gray-200 mb-2 font-semibold">{type.name}</div>
              <button
                className="text-purple-100 hover:underline text-xs sm:text-sm font-bold transition-all duration-200"
                // onClick={() => setModalType(type)} // For modal integration
              >
                Learn more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Card showing how many people have used the website */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in-up">
        <div className="bg-[#18192a]/90 backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-400/30 shadow-2xl text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-100 mb-4 sm:mb-6 flex flex-col items-center">
            Join the Community!
            <span className="mt-2 text-base sm:text-lg text-gray-300">Follow us on</span>
            <a href="https://www.instagram.com/codesentinel.tech/" target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center text-pink-400 hover:text-pink-500 transition-colors">
              <Instagram className="w-6 h-6 sm:w-7 sm:h-7" />
            </a>
          </h3>
          <p className="text-lg sm:text-xl text-gray-200 mb-4 sm:mb-6">
            <span className="font-bold text-pink-400 text-2xl sm:text-3xl">{clickCount.toLocaleString()}</span> personalities and counting—add yours!
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg sm:text-xl min-h-[48px] sm:min-h-[56px]"
            onClick={async () => {
              await trackClick({
                link: 'Join Community',
                href: '/quiz',
                userId: user?.uid || undefined,
                userEmail: user?.email || undefined,
              });
            }}
          >
            <Star className="w-5 h-5 sm:w-6 sm:h-6" />
            Start Your Journey
          </Link>
        </div>
      </section>

        {/* Minimal Footer */}
        <footer className="w-full py-4 bg-black/60 border-t border-white/20 text-center mt-8">
          <div className="text-gray-400 text-base">
            &copy; {new Date().getFullYear()} PersonalityTest. All rights reserved. |{' '}
            <a href="mailto:codesentinel.tech@gmail.com" className="text-blue-400 hover:underline font-medium"
              onClick={async () => {
                await trackClick({
                  link: 'Contact Us',
                  href: 'mailto:codesentinel.tech@gmail.com',
                  userId: user?.uid,
                  userEmail: user?.email || undefined,
                });
              }}
            >Contact Us</a>
          </div>
        </footer>
      {/* Floating Assistant Widget */}
      <FloatingAssistant />
    </>
  );
}