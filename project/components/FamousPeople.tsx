'use client';

import { PersonalityType } from '@/data/results';
import { Star, Quote } from 'lucide-react';

interface FamousPeopleProps {
  personalityType: PersonalityType;
}

export default function FamousPeople({ personalityType }: FamousPeopleProps) {
  const famousQuotes = {
    "Elon Musk": "When something is important enough, you do it even if the odds are not in your favor.",
    "Isaac Newton": "If I have seen further it is by standing on the shoulders of Giants.",
    "Albert Einstein": "Imagination is more important than knowledge.",
    "Charles Darwin": "It is not the strongest of the species that survives, but the most adaptable.",
    "Steve Jobs": "Innovation distinguishes between a leader and a follower.",
    "Margaret Thatcher": "If you want something said, ask a man; if you want something done, ask a woman.",
    "Mark Twain": "The secret of getting ahead is getting started.",
    "Tom Hanks": "Life is like a box of chocolates. You never know what you're gonna get.",
    "Martin Luther King Jr.": "The time is always right to do what is right.",
    "Nelson Mandela": "It always seems impossible until it's done.",
    "William Shakespeare": "To be, or not to be, that is the question.",
    "J.R.R. Tolkien": "Not all those who wander are lost.",
    "Oprah Winfrey": "The biggest adventure you can take is to live the life of your dreams.",
    "Barack Obama": "Change will not come if we wait for some other person or some other time.",
    "Robin Williams": "You're only given a little spark of madness. You mustn't lose it.",
    "Ellen DeGeneres": "Be kind to one another.",
    "Warren Buffett": "Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.",
    "George Washington": "It is better to offer no excuse than a bad one.",
    "Mother Teresa": "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "Kate Middleton": "The children have been incredible in their enthusiasm for it.",
    "Franklin D. Roosevelt": "The only thing we have to fear is fear itself.",
    "Judge Judy": "If you tell the truth, you don't have to have a good memory.",
    "Taylor Swift": "People haven't always been there for me, but music always has.",
    "Danny Glover": "I try to find hope in struggle and resistance in small places as much as I can.",
    "Michael Jordan": "I've missed more than 9000 shots in my career. I've lost almost 300 games.",
    "Bruce Lee": "Be like water making its way through cracks.",
    "Michael Jackson": "In a world filled with hate, we must still dare to hope.",
    "Avril Lavigne": "I'm the kind of person who always likes to be doing something.",
    "Donald Trump": "Sometimes by losing a battle you find a new way to win the war.",
    "Ernest Hemingway": "The world breaks everyone, and afterward, some are strong at the broken places.",
    "Marilyn Monroe": "Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.",
    "Elvis Presley": "Truth is like the sun. You can shut it out for a time, but it ain't goin' away."
  };

  const getRandomQuote = (name: string) => {
    return famousQuotes[name as keyof typeof famousQuotes] || "A quote that inspires and motivates.";
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Famous {personalityType.code}s</h2>
        <p className="text-gray-600 dark:text-gray-400">Inspiring individuals who share your personality type</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {personalityType.famous.map((person, index) => (
          <div key={index} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${personalityType.gradient} rounded-full flex items-center justify-center`}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{person}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{personalityType.code}</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{personalityType.name}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <Quote className="w-5 h-5 text-gray-400 dark:text-gray-500 mb-2" />
                <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed">
                  "{getRandomQuote(person)}"
                </p>
              </div>

              {/* Personality Connection */}
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  <strong>Personality Connection:</strong> Like you, {person.split(' ')[0]} demonstrates the key {personalityType.code} traits of {personalityType.strengths.slice(0, 2).join(' and ').toLowerCase()}.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}