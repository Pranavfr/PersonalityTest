'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
      <div 
        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
      <div className="flex justify-between items-center mt-2 text-sm text-gray-200">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
    </div>
  );
}