'use client';

import Navigation from '@/components/Navigation';
import { Sparkles, User, BarChart3, Lightbulb, Users, Star, ArrowRight, Instagram } from 'lucide-react';
import FloatingAssistant from '@/components/FloatingAssistant';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Lottie from 'lottie-react';
// Placeholder Lottie imports (replace with your own files)
import heroAvatar from '@/public/lotties/hero-avatar.json';
import assistantLottie from '@/public/lotties/assistant.json';
import typeIntj from '@/public/lotties/type-intj.json';
import typeEnfp from '@/public/lotties/type-enfp.json';
import typeIstp from '@/public/lotties/type-istp.json';
import typeInfj from '@/public/lotties/type-infj.json';
import testimonialMale from '@/public/lotties/testimonial-male.json';
import testimonialFemale from '@/public/lotties/testimonial-female.json';
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
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-32 min-h-[60vh]">
        {/* Aurora background restored */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-pink-900/30 blur-2xl pointer-events-none" />
        <div className="max-w-3xl mx-auto bg-[#18192a]/90 backdrop-blur-lg rounded-2xl p-12 border border-purple-400/30 shadow-2xl text-center animate-fade-in flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Discover Your <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">True Self</span>
          </h1>
          <p className="text-2xl text-gray-200 mb-8 font-semibold">
            Take our comprehensive 54-question personality assessment and unlock deep insights about your unique strengths, preferences, and growth opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
            <a
              href="/quiz"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#232946]/90 text-purple-100 font-bold text-xl shadow-lg border-2 border-purple-400/40 hover:bg-[#232946] transition-all duration-200"
              onClick={async () => {
                await trackClick({
                  link: 'Start Test',
                  href: '/quiz',
                  userId: user?.uid,
                  userEmail: user?.email,
                });
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              Start Your Test
            </a>
            <div className="flex items-center gap-2 text-lg text-gray-200 font-semibold">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              Takes 10-15 minutes
            </div>
          </div>
        </div>
      </section>

        {/* Steps Section */}
        <section className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap gap-6 md:gap-8 justify-center items-stretch px-2 sm:px-4 py-8 md:py-12 animate-fade-in-up w-full">
          {steps.map((step, i) => (
            <div
              key={i}
              className="w-full max-w-xs md:max-w-sm flex-1 bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 flex flex-col items-center text-center mx-auto"
            >
              <step.icon className="w-12 h-12 mb-4 text-[#E92EFB] drop-shadow-[0_0_8px_#E92EFB88] group-hover:text-[#FF2079] transition-all duration-200" />
              <h3 className="text-xl font-bold text-purple-100 mb-2">{step.title}</h3>
              <p className="text-gray-200">{step.desc}</p>
            </div>
          ))}
        </section>

        {/* Personality Types Grid */}
        <section className="max-w-6xl mx-auto px-2 sm:px-4 py-10 md:py-16 animate-fade-in-up w-full">
          <div className="w-full flex justify-center mb-8 md:mb-10">
            <div className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center m-0">Explore Personality Types</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
            {personalityTypes.map((type, i) => (
              <div
                key={i}
                className="bg-[#18192a]/90 rounded-2xl p-6 border border-purple-400/30 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-200 flex flex-col items-center text-center"
              >
                <type.icon className="w-10 h-10 text-blue-400 mb-3" />
                <div className="text-xl font-bold text-white mb-1">{type.code}</div>
                <div className="text-base text-gray-200 mb-2 font-semibold">{type.name}</div>
                <button
                  className="text-purple-100 hover:underline text-xs font-bold transition-all duration-200"
                  // onClick={() => setModalType(type)} // For modal integration
                >
                  Learn more
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Card showing how many people have used the website */}
        <section className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-2">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-[#18192a] dark:bg-[#18192a] rounded-3xl p-6 sm:p-8 md:p-10 border border-purple-400/30 shadow-2xl flex flex-col items-center text-center">
            <h3 className="text-3xl font-extrabold text-purple-100 dark:text-purple-200 mb-4 flex flex-col items-center">
              Join the Community!
              <span className="mt-2 text-base text-gray-300">Follow us on</span>
              <a href="https://www.instagram.com/codesentinel.tech/" target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-center text-pink-400 hover:text-pink-500 transition-colors"
                onClick={async () => {
                  await trackClick({
                    link: 'Instagram',
                    href: 'https://www.instagram.com/codesentinel.tech/',
                    userId: user?.uid,
                    userEmail: user?.email,
                  });
                }}
              >
                <Instagram className="w-7 h-7" />
              </a>
            </h3>
            <p className="text-lg text-gray-200 dark:text-white/90 mb-2">
              <span className="font-bold text-pink-400 text-2xl">{clickCount.toLocaleString()}</span> personalities and counting—add yours!
            </p>
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
                  userEmail: user?.email,
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