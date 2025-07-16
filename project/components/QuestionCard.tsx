'use client';

import { useState } from 'react';
import { Question } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (score: number) => void;
  currentAnswer?: number;
}

export default function QuestionCard({ question, onAnswer, currentAnswer }: QuestionCardProps) {
  const [selectedScore, setSelectedScore] = useState<number>(currentAnswer || 0);

  const handleScoreSelect = (score: number) => {
    setSelectedScore(score);
    onAnswer(score);
  };

  const scaleLabels = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Slightly Disagree" },
    { value: 4, label: "Neutral" },
    { value: 5, label: "Slightly Agree" },
    { value: 6, label: "Agree" },
    { value: 7, label: "Strongly Agree" }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-relaxed">
            {question.text}
          </h2>
          <p className="text-gray-600">
            How much do you agree with this statement?
          </p>
        </div>

        <div className="space-y-3">
          {scaleLabels.map((option) => (
            <button
              key={option.value}
              onClick={() => handleScoreSelect(option.value)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md ${
                selectedScore === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">{option.label}</span>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedScore === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedScore === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}