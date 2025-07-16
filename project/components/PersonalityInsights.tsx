'use client';

import { useState } from 'react';
import { PersonalityType } from '@/data/results';
import { Sparkles, TrendingUp, CheckCircle, XCircle, Lightbulb, Users } from 'lucide-react';

interface PersonalityInsightsProps {
  personalityType: PersonalityType;
}

export default function PersonalityInsights({ personalityType }: PersonalityInsightsProps) {
  const [activeTab, setActiveTab] = useState('strengths');

  const tabs = [
    { id: 'strengths', label: 'Strengths', icon: Sparkles },
    { id: 'growth', label: 'Growth Areas', icon: TrendingUp },
    { id: 'dos-donts', label: "Do's & Don'ts", icon: Lightbulb },
  ];

  const growthTips = {
    INTJ: ["Practice expressing ideas more clearly to others", "Set aside time for social connections", "Learn to appreciate different perspectives"],
    INTP: ["Create structured schedules to improve productivity", "Practice active listening in conversations", "Set concrete deadlines for projects"],
    ENTJ: ["Develop patience with slower decision-makers", "Practice empathy in leadership situations", "Allow time for team input and feedback"],
    ENTP: ["Focus on completing projects before starting new ones", "Develop consistent daily routines", "Practice patience with detailed work"],
    INFJ: ["Set healthy boundaries to prevent burnout", "Practice expressing needs more directly", "Embrace imperfection in daily tasks"],
    INFP: ["Develop practical planning skills", "Practice assertiveness in conflicts", "Set realistic timelines for goals"],
    ENFJ: ["Learn to say no to avoid overcommitment", "Focus on your own needs occasionally", "Practice giving constructive criticism"],
    ENFP: ["Develop follow-through on important projects", "Create systems for managing details", "Practice patience with routine tasks"],
    ISTJ: ["Practice flexibility when plans change", "Explore new approaches to familiar problems", "Express appreciation for others' creativity"],
    ISFJ: ["Practice asserting your own needs", "Learn to delegate tasks to others", "Embrace change as an opportunity"],
    ESTJ: ["Practice active listening before responding", "Consider emotional factors in decisions", "Allow flexibility in plans and processes"],
    ESFJ: ["Practice making decisions independently", "Learn to handle criticism constructively", "Focus on your own goals occasionally"],
    ISTP: ["Practice expressing thoughts and feelings", "Develop long-term planning skills", "Engage more in team collaboration"],
    ISFP: ["Practice speaking up in group settings", "Develop organizational systems", "Set and communicate clear boundaries"],
    ESTP: ["Develop patience for long-term planning", "Practice reflection before acting", "Consider consequences of decisions"],
    ESFP: ["Develop focus for detailed tasks", "Practice planning ahead", "Learn to handle criticism constructively"]
  };

  const dosAndDonts = {
    INTJ: {
      dos: ["Trust your strategic vision", "Take time for deep thinking", "Focus on long-term goals", "Value competence over popularity"],
      donts: ["Dismiss others' emotions", "Rush important decisions", "Avoid all social situations", "Be overly critical of mistakes"]
    },
    INTP: {
      dos: ["Follow your curiosity", "Question assumptions", "Value intellectual honesty", "Take time to process information"],
      donts: ["Ignore practical deadlines", "Dismiss emotional considerations", "Avoid making decisions", "Be condescending to others"]
    },
    ENTJ: {
      dos: ["Lead with confidence", "Focus on efficiency", "Set clear expectations", "Drive toward goals"],
      donts: ["Ignore team morale", "Rush through details", "Dismiss others' input", "Be impatient with learning curves"]
    },
    ENTP: {
      dos: ["Embrace new possibilities", "Challenge conventional thinking", "Network and collaborate", "Stay curious and open"],
      donts: ["Abandon projects midway", "Ignore routine maintenance", "Be argumentative for its own sake", "Overlook practical constraints"]
    },
    INFJ: {
      dos: ["Trust your intuition", "Focus on meaningful work", "Help others grow", "Take time for reflection"],
      donts: ["Overcommit to others' needs", "Ignore your physical health", "Avoid necessary conflicts", "Perfectionism paralysis"]
    },
    INFP: {
      dos: ["Follow your values", "Express creativity", "Support others authentically", "Take time for self-reflection"],
      donts: ["Compromise core values", "Avoid difficult conversations", "Procrastinate on important tasks", "Take criticism too personally"]
    },
    ENFJ: {
      dos: ["Inspire and motivate others", "Focus on people's potential", "Create harmony", "Lead with empathy"],
      donts: ["Neglect your own needs", "Avoid giving tough feedback", "Take on everyone's problems", "Ignore logical considerations"]
    },
    ENFP: {
      dos: ["Follow your enthusiasm", "Connect with diverse people", "Explore new possibilities", "Trust your instincts"],
      donts: ["Overcommit to too many projects", "Ignore practical details", "Avoid routine maintenance", "Make decisions too quickly"]
    },
    ISTJ: {
      dos: ["Value tradition and stability", "Focus on practical solutions", "Be reliable and consistent", "Plan thoroughly"],
      donts: ["Resist all change", "Ignore others' emotions", "Rush through new experiences", "Be overly rigid"]
    },
    ISFJ: {
      dos: ["Support others genuinely", "Pay attention to details", "Create harmonious environments", "Be patient and kind"],
      donts: ["Neglect your own needs", "Avoid expressing disagreement", "Take on too much responsibility", "Resist necessary changes"]
    },
    ESTJ: {
      dos: ["Take charge when needed", "Focus on results", "Organize and plan", "Be direct and honest"],
      donts: ["Ignore team emotions", "Rush through relationship building", "Be inflexible with methods", "Dismiss creative solutions"]
    },
    ESFJ: {
      dos: ["Create positive environments", "Support team harmony", "Pay attention to others' needs", "Be warm and encouraging"],
      donts: ["Avoid necessary conflicts", "Take criticism too personally", "Neglect your own goals", "Be overly dependent on approval"]
    },
    ISTP: {
      dos: ["Work with your hands", "Solve practical problems", "Stay flexible and adaptable", "Value independence"],
      donts: ["Avoid emotional conversations", "Procrastinate on planning", "Ignore others' feelings", "Rush into commitments"]
    },
    ISFP: {
      dos: ["Express your creativity", "Stay true to your values", "Appreciate beauty", "Be gentle and supportive"],
      donts: ["Avoid conflict at all costs", "Neglect practical responsibilities", "Be overly self-critical", "Rush major decisions"]
    },
    ESTP: {
      dos: ["Take action quickly", "Adapt to changing situations", "Enjoy the present moment", "Be practical and realistic"],
      donts: ["Ignore long-term consequences", "Avoid planning ahead", "Be insensitive to others", "Rush through important details"]
    },
    ESFP: {
      dos: ["Bring energy to situations", "Focus on people's needs", "Stay optimistic", "Enjoy life's experiences"],
      donts: ["Avoid difficult conversations", "Neglect long-term planning", "Take criticism too personally", "Overcommit to social activities"]
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'strengths':
        return (
          <div className="space-y-4">
            {personalityType.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">{strength}</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    This strength helps you excel in collaborative environments and leadership roles.
                  </p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'growth':
        return (
          <div className="space-y-4">
            {growthTips[personalityType.code as keyof typeof growthTips]?.map((tip, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-blue-800 dark:text-blue-300 font-medium">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'dos-donts':
        const typeData = dosAndDonts[personalityType.code as keyof typeof dosAndDonts];
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Do's */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Do's
              </h4>
              {typeData?.dos.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-green-700 dark:text-green-300">{item}</p>
                </div>
              ))}
            </div>

            {/* Don'ts */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-red-800 dark:text-red-300 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Don'ts
              </h4>
              {typeData?.donts.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-red-700 dark:text-red-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Deep Personality Insights</h2>
        <p className="text-gray-600 dark:text-gray-400">Explore your strengths, growth areas, and actionable tips</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {renderContent()}
      </div>
    </div>
  );
}