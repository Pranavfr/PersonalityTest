'use client';

import { useState } from 'react';
import { PersonalityType } from '@/data/results';
import { Share2, Download, RotateCcw, Copy, Check, Image as ImageIcon } from 'lucide-react';

interface ShareAndActionsProps {
  personalityType: PersonalityType;
  percentages: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
  };
  onRestart: () => void;
}

export default function ShareAndActions({ personalityType, percentages, onRestart }: ShareAndActionsProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleShare = async () => {
    const shareText = `I just discovered I'm ${personalityType.name} (${personalityType.code})! 🧠\n\n${personalityType.description}\n\nTake the personality test to discover your type: ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm ${personalityType.name} (${personalityType.code})`,
          text: shareText,
          url: window.location.origin
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } else {
      // Fallback for browsers without Web Share API
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateShareImage = async () => {
    setIsGeneratingImage(true);
    
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      setIsGeneratingImage(false);
      return;
    }

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const colors = personalityType.gradient.match(/from-(\w+)-(\d+)\s+to-(\w+)-(\d+)/);
    
    // Fallback gradient
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#8B5CF6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(personalityType.code, canvas.width / 2, 150);

    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.fillText(personalityType.name, canvas.width / 2, 200);

    ctx.font = '20px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    
    // Word wrap for description
    const words = personalityType.description.split(' ');
    let line = '';
    let y = 280;
    const maxWidth = 700;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[n] + ' ';
        y += 30;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    // Add website URL
    ctx.font = '18px Inter, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Take the test at: ' + window.location.origin, canvas.width / 2, canvas.height - 50);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `personality-${personalityType.code}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      setIsGeneratingImage(false);
    }, 'image/png');
  };

  const generatePDFReport = () => {
    // Create a comprehensive text report
    const report = `
PERSONALITY TEST RESULT
=======================

Type: ${personalityType.code} - ${personalityType.name}

DESCRIPTION
-----------
${personalityType.description}

TRAIT BREAKDOWN
---------------
Mind: ${percentages.mind}% (${percentages.mind >= 50 ? 'Extraverted' : 'Introverted'})
Energy: ${percentages.energy}% (${percentages.energy >= 50 ? 'Intuitive' : 'Observant'})
Nature: ${percentages.nature}% (${percentages.nature >= 50 ? 'Feeling' : 'Thinking'})
Tactics: ${percentages.tactics}% (${percentages.tactics >= 50 ? 'Prospecting' : 'Judging'})

STRENGTHS
---------
${personalityType.strengths.map(s => `• ${s}`).join('\n')}

AREAS FOR GROWTH
----------------
${personalityType.weaknesses.map(w => `• ${w}`).join('\n')}

FAMOUS PEOPLE WITH YOUR TYPE
----------------------------
${personalityType.famous.map(f => `• ${f}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
Take the test again at: ${window.location.origin}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `personality-report-${personalityType.code}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/20 dark:border-gray-700/20">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Share Your Results</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Let others know about your personality type or save your results</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
        >
          {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          {copied ? 'Copied!' : 'Share Result'}
        </button>

        {/* Generate Image */}
        <button
          onClick={generateShareImage}
          disabled={isGeneratingImage}
          className="flex items-center justify-center gap-2 sm:gap-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
        >
          <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          {isGeneratingImage ? 'Generating...' : 'Share Image'}
        </button>

        {/* Download Report */}
        <button
          onClick={generatePDFReport}
          className="flex items-center justify-center gap-2 sm:gap-3 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
        >
          <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          Download Report
        </button>

        {/* Retake Quiz */}
        <button
          onClick={onRestart}
          className="flex items-center justify-center gap-2 sm:gap-3 bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          Retake Quiz
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Want to Compare Results?</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
            Share this test with friends and family to see how your personalities complement each other!
          </p>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.origin)}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 sm:px-4 py-2 rounded-xl font-medium transition-colors border border-gray-200 dark:border-gray-700 text-sm sm:text-base"
          >
            <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
            Copy Test Link
          </button>
        </div>
      </div>
    </div>
  );
}