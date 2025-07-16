"use client";
import Navigation from "@/components/Navigation";
import { trackClick } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';

const faqs = [
  {
    question: "What is a personality type?",
    answer: "A personality type is a classification that describes how people think, feel, and behave. Our test is based on the MBTI framework, which identifies 16 unique types."
  },
  {
    question: "How accurate is this personality test?",
    answer: "Our test is based on established psychological research and is designed to provide valuable insights. However, no test is 100% accurate—use your results as a tool for self-discovery, not a strict label."
  },
  {
    question: "Can my personality type change over time?",
    answer: "While core preferences tend to remain stable, people can grow and adapt. Life experiences, personal growth, and conscious effort can influence how you express your type."
  },
  {
    question: "Is this test free?",
    answer: "Yes! Our personality test and all educational resources are completely free to use."
  },
  {
    question: "How do I use my results?",
    answer: "Use your results to better understand yourself, improve relationships, and make informed decisions about your career and personal growth."
  },
  {
    question: "Is my data private?",
    answer: "Absolutely. We respect your privacy and do not share your personal data with third parties."
  }
];

export default function FAQPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto max-w-3xl py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow mb-8 max-w-2xl mx-auto leading-relaxed">
            Answers to common questions about personality types, the test, and using this site.
          </p>
        </div>
        <div className="space-y-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{faq.question}</h2>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 