'use client';

import { PersonalityType } from '@/data/results';
import { Briefcase, Heart, Target, MessageCircle, Book, Music, Video } from 'lucide-react';

interface LifestyleRecommendationsProps {
  personalityType: PersonalityType;
}

export default function LifestyleRecommendations({ personalityType }: LifestyleRecommendationsProps) {
  const recommendations = {
    INTJ: {
      careers: ["Strategic Planner", "Software Architect", "Research Scientist", "Investment Analyst"],
      relationships: ["ENFP", "ENTP", "INFP", "INTJ"],
      growthTips: ["Join strategic thinking groups", "Practice public speaking", "Develop emotional intelligence"],
      conflictStyle: "Prefers logical analysis over emotional discussions",
      books: ["Good to Great", "The Lean Startup", "Thinking, Fast and Slow"],
      music: ["Classical", "Ambient", "Progressive Rock"],
      videos: ["TED Talks on Innovation", "Strategic Planning Courses", "Philosophy Lectures"]
    },
    INTP: {
      careers: ["Research Scientist", "Software Developer", "Philosopher", "Data Analyst"],
      relationships: ["ENTJ", "ENFJ", "INFJ", "INTP"],
      growthTips: ["Set concrete deadlines", "Practice explaining complex ideas simply", "Join collaborative projects"],
      conflictStyle: "Seeks logical understanding before emotional resolution",
      books: ["Gödel, Escher, Bach", "The Structure of Scientific Revolutions", "Sapiens"],
      music: ["Jazz", "Electronic", "Experimental"],
      videos: ["Science Documentaries", "Logic Puzzles", "Technology Reviews"]
    },
    ENTJ: {
      careers: ["CEO", "Management Consultant", "Entrepreneur", "Project Manager"],
      relationships: ["INFP", "INTP", "ENFJ", "ENTJ"],
      growthTips: ["Practice active listening", "Develop team empathy", "Learn to delegate effectively"],
      conflictStyle: "Direct approach focused on solutions and efficiency",
      books: ["The 7 Habits of Highly Effective People", "Good to Great", "The Lean Startup"],
      music: ["Rock", "Classical", "Motivational"],
      videos: ["Leadership Masterclasses", "Business Strategy", "Entrepreneurship Stories"]
    },
    ENTP: {
      careers: ["Entrepreneur", "Marketing Director", "Journalist", "Innovation Consultant"],
      relationships: ["INFJ", "INTJ", "ENFP", "ENTP"],
      growthTips: ["Focus on follow-through", "Develop routine habits", "Practice patience with details"],
      conflictStyle: "Enjoys intellectual debate but may avoid emotional depth",
      books: ["The Innovator's Dilemma", "Freakonomics", "The Art of Possibility"],
      music: ["Indie Rock", "Hip Hop", "World Music"],
      videos: ["Innovation Talks", "Debate Competitions", "Creative Documentaries"]
    },
    INFJ: {
      careers: ["Counselor", "Writer", "Human Resources", "Non-profit Leader"],
      relationships: ["ENTP", "ENFP", "INFP", "INFJ"],
      growthTips: ["Set healthy boundaries", "Practice self-advocacy", "Embrace imperfection"],
      conflictStyle: "Seeks harmony while addressing underlying issues",
      books: ["The Gifts of Imperfection", "Man's Search for Meaning", "The Alchemist"],
      music: ["Indie Folk", "Classical", "Ambient"],
      videos: ["Psychology Lectures", "Mindfulness Guides", "Inspirational Stories"]
    },
    INFP: {
      careers: ["Writer", "Graphic Designer", "Social Worker", "Therapist"],
      relationships: ["ENFJ", "ENTJ", "INFJ", "INFP"],
      growthTips: ["Practice assertiveness", "Set realistic deadlines", "Develop practical skills"],
      conflictStyle: "Values-driven approach seeking authentic resolution",
      books: ["The Artist's Way", "Daring Greatly", "Big Magic"],
      music: ["Indie Folk", "Singer-Songwriter", "Alternative"],
      videos: ["Creative Process Documentaries", "Personal Growth", "Art Tutorials"]
    },
    ENFJ: {
      careers: ["Teacher", "Life Coach", "HR Manager", "Non-profit Director"],
      relationships: ["INFP", "ISFP", "ENFP", "ENFJ"],
      growthTips: ["Learn to say no", "Focus on personal needs", "Practice constructive criticism"],
      conflictStyle: "Focuses on people's feelings and group harmony",
      books: ["The 5 Love Languages", "Crucial Conversations", "Emotional Intelligence"],
      music: ["Pop", "R&B", "Inspirational"],
      videos: ["Leadership Development", "Communication Skills", "Team Building"]
    },
    ENFP: {
      careers: ["Marketing Manager", "Event Planner", "Journalist", "Life Coach"],
      relationships: ["INTJ", "INFJ", "ENFJ", "ENFP"],
      growthTips: ["Develop follow-through systems", "Practice focus techniques", "Create structured routines"],
      conflictStyle: "Enthusiastic problem-solving with focus on possibilities",
      books: ["The Power of Now", "Big Magic", "The Happiness Project"],
      music: ["Pop", "Indie Rock", "World Music"],
      videos: ["Motivational Speakers", "Creative Inspiration", "Travel Documentaries"]
    },
    ISTJ: {
      careers: ["Accountant", "Project Manager", "Engineer", "Administrator"],
      relationships: ["ESFP", "ESTP", "ISFJ", "ISTJ"],
      growthTips: ["Practice flexibility", "Explore creative solutions", "Express appreciation openly"],
      conflictStyle: "Methodical approach based on facts and established procedures",
      books: ["Getting Things Done", "The 7 Habits", "Good to Great"],
      music: ["Classical", "Country", "Traditional"],
      videos: ["Productivity Systems", "Historical Documentaries", "How-to Guides"]
    },
    ISFJ: {
      careers: ["Nurse", "Teacher", "Social Worker", "Administrative Assistant"],
      relationships: ["ESFP", "ESTP", "ENFP", "ISFJ"],
      growthTips: ["Practice assertiveness", "Delegate responsibilities", "Embrace change as opportunity"],
      conflictStyle: "Gentle approach focused on maintaining relationships",
      books: ["The Gifts of Imperfection", "Boundaries", "The 5 Love Languages"],
      music: ["Folk", "Classical", "Soft Rock"],
      videos: ["Self-Care Guides", "Relationship Advice", "Mindfulness Content"]
    },
    ESTJ: {
      careers: ["Operations Manager", "Sales Manager", "Military Officer", "Executive"],
      relationships: ["ISFP", "ISTP", "ESFJ", "ESTJ"],
      growthTips: ["Practice active listening", "Consider emotional factors", "Allow process flexibility"],
      conflictStyle: "Direct and decisive approach focused on practical solutions",
      books: ["The Leadership Challenge", "Execution", "The Effective Executive"],
      music: ["Rock", "Country", "Classical"],
      videos: ["Leadership Training", "Business Strategy", "Management Skills"]
    },
    ESFJ: {
      careers: ["Human Resources", "Event Coordinator", "Teacher", "Healthcare Administrator"],
      relationships: ["ISFP", "ISTP", "ESFP", "ESFJ"],
      growthTips: ["Practice independent decision-making", "Handle criticism constructively", "Focus on personal goals"],
      conflictStyle: "Collaborative approach emphasizing group harmony",
      books: ["The 5 Love Languages", "Crucial Conversations", "The People Pleaser's Guide"],
      music: ["Pop", "R&B", "Country"],
      videos: ["Team Building", "Communication Skills", "Social Dynamics"]
    },
    ISTP: {
      careers: ["Mechanic", "Engineer", "Pilot", "Software Developer"],
      relationships: ["ESFJ", "ESTJ", "ISFP", "ISTP"],
      growthTips: ["Practice expressing thoughts", "Develop long-term planning", "Engage in team collaboration"],
      conflictStyle: "Practical problem-solving with minimal emotional involvement",
      books: ["The Lean Startup", "Peak Performance", "Flow"],
      music: ["Rock", "Electronic", "Blues"],
      videos: ["Technical Tutorials", "Adventure Sports", "Problem-Solving Challenges"]
    },
    ISFP: {
      careers: ["Artist", "Musician", "Counselor", "Veterinarian"],
      relationships: ["ESFJ", "ESTJ", "ENFJ", "ISFP"],
      growthTips: ["Practice speaking up", "Develop organizational systems", "Set clear boundaries"],
      conflictStyle: "Values-based approach seeking authentic understanding",
      books: ["The Artist's Way", "Big Magic", "The Gifts of Imperfection"],
      music: ["Indie Folk", "Alternative", "Singer-Songwriter"],
      videos: ["Art Tutorials", "Nature Documentaries", "Personal Growth"]
    },
    ESTP: {
      careers: ["Sales Representative", "Entrepreneur", "Paramedic", "Athletic Coach"],
      relationships: ["ISFJ", "ISTJ", "ESFP", "ESTP"],
      growthTips: ["Develop patience for planning", "Practice reflection", "Consider long-term consequences"],
      conflictStyle: "Action-oriented approach focused on immediate solutions",
      books: ["The Lean Startup", "Never Eat Alone", "The Power of Moments"],
      music: ["Hip Hop", "Rock", "Electronic"],
      videos: ["Adventure Sports", "Business Success Stories", "Action Movies"]
    },
    ESFP: {
      careers: ["Event Planner", "Actor", "Social Worker", "Tour Guide"],
      relationships: ["ISFJ", "ISTJ", "ENFP", "ESFP"],
      growthTips: ["Develop focus for details", "Practice planning ahead", "Handle criticism constructively"],
      conflictStyle: "People-focused approach emphasizing emotional understanding",
      books: ["The Happiness Project", "The Power of Moments", "Daring Greatly"],
      music: ["Pop", "R&B", "Dance"],
      videos: ["Entertainment", "Social Dynamics", "Feel-Good Content"]
    }
  };

  const typeRecs = recommendations[personalityType.code as keyof typeof recommendations];

  const sections = [
    {
      title: "Career Paths",
      icon: Briefcase,
      items: typeRecs.careers,
      color: "blue"
    },
    {
      title: "Compatible Types",
      icon: Heart,
      items: typeRecs.relationships,
      color: "pink"
    },
    {
      title: "Growth Tips",
      icon: Target,
      items: typeRecs.growthTips,
      color: "green"
    },
    {
      title: "Book Recommendations",
      icon: Book,
      items: typeRecs.books,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
      pink: "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-800 dark:text-pink-300",
      green: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
      purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Lifestyle & Recommendations</h2>
        <p className="text-gray-600 dark:text-gray-400">Personalized suggestions for your personality type</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <div key={index} className={`p-6 rounded-2xl border ${getColorClasses(section.color)}`}>
              <div className="flex items-center gap-3 mb-4">
                <IconComponent className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Conflict Style */}
      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <MessageCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300">Conflict Resolution Style</h3>
        </div>
        <p className="text-orange-700 dark:text-orange-300">{typeRecs.conflictStyle}</p>
      </div>

      {/* Media Recommendations */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-3 mb-4">
            <Music className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">Music Genres</h3>
          </div>
          <div className="space-y-2">
            {typeRecs.music.map((genre, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">{genre}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
          <div className="flex items-center gap-3 mb-4">
            <Video className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <h3 className="text-xl font-semibold text-teal-800 dark:text-teal-300">Video Content</h3>
          </div>
          <div className="space-y-2">
            {typeRecs.videos.map((video, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-600 dark:bg-teal-400 rounded-full" />
                <span className="text-sm font-medium text-teal-700 dark:text-teal-300">{video}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}