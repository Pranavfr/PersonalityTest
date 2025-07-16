export interface PersonalityType {
  code: string;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  color: string;
  gradient: string;
  famous: string[];
  traits: {
    mind: { trait: string; percentage: number };
    energy: { trait: string; percentage: number };
    nature: { trait: string; percentage: number };
    tactics: { trait: string; percentage: number };
  };
  growthTips?: string[];
  careers?: string[];
}

export const personalityTypes: Record<string, PersonalityType> = {
  // Analysts
  INTJ: {
    code: "INTJ",
    name: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything. INTJs are independent, determined, and have strong convictions. They see the big picture and are driven to turn their vision into reality.",
    strengths: ["Strategic thinking", "Independent", "Determined", "Hard-working", "Open-minded"],
    weaknesses: ["Overly critical", "Combative", "Emotionally distant", "Impatient", "Perfectionist"],
    color: "purple",
    gradient: "from-purple-500 to-indigo-600",
    famous: ["Elon Musk", "Isaac Newton", "Stephen Hawking", "Nikola Tesla"],
    traits: {
      mind: { trait: "Introverted", percentage: 75 },
      energy: { trait: "Intuitive", percentage: 80 },
      nature: { trait: "Thinking", percentage: 85 },
      tactics: { trait: "Judging", percentage: 70 }
    },
    growthTips: [
      "Set clear, achievable goals and break them into actionable steps.",
      "Practice open communication and seek feedback from others.",
      "Balance your strategic vision with attention to emotional needs.",
      "Take time to celebrate small wins and progress."
    ],
    careers: [
      "Engineer",
      "Scientist",
      "Software Developer",
      "Strategic Consultant",
      "Architect"
    ]
  },
  INTP: {
    code: "INTP",
    name: "The Thinker",
    description: "Innovative inventors with an unquenchable thirst for knowledge. INTPs are flexible and tolerant, taking an egalitarian approach to their work and the people around them.",
    strengths: ["Analytical", "Original", "Open-minded", "Curious", "Objective"],
    weaknesses: ["Disconnected", "Insensitive", "Absent-minded", "Condescending", "Loathe rules"],
    color: "green",
    gradient: "from-green-500 to-teal-600",
    famous: ["Albert Einstein", "Charles Darwin", "Marie Curie", "Socrates"],
    traits: {
      mind: { trait: "Introverted", percentage: 80 },
      energy: { trait: "Intuitive", percentage: 85 },
      nature: { trait: "Thinking", percentage: 90 },
      tactics: { trait: "Prospecting", percentage: 75 }
    },
    growthTips: ["Embrace collaboration and share your ideas with others."],
    careers: ["Researcher", "Philosopher", "Programmer"]
  },
  ENTJ: {
    code: "ENTJ",
    name: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way or making one. ENTJs are natural-born leaders who inspire others to achieve collective goals.",
    strengths: ["Efficient", "Energetic", "Self-confident", "Strong-willed", "Strategic thinker"],
    weaknesses: ["Stubborn", "Impatient", "Arrogant", "Poor handling of emotions", "Cold"],
    color: "red",
    gradient: "from-red-500 to-orange-600",
    famous: ["Steve Jobs", "Margaret Thatcher", "Napoleon Bonaparte", "Bill Gates"],
    traits: {
      mind: { trait: "Extraverted", percentage: 75 },
      energy: { trait: "Intuitive", percentage: 80 },
      nature: { trait: "Thinking", percentage: 85 },
      tactics: { trait: "Judging", percentage: 80 }
    },
    growthTips: ["Develop patience and listen to team input."],
    careers: ["Executive", "Entrepreneur", "Project Manager"]
  },
  ENTP: {
    code: "ENTP",
    name: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge. ENTPs are inspired innovators, motivated to find new solutions to intellectually challenging problems.",
    strengths: ["Knowledgeable", "Quick thinker", "Original", "Excellent brainstormer", "Charismatic"],
    weaknesses: ["Argumentative", "Insensitive", "Intolerant", "Difficulty focusing", "Dislike practical matters"],
    color: "orange",
    gradient: "from-orange-500 to-red-600",
    famous: ["Mark Twain", "Tom Hanks", "Sarah Silverman", "Jon Stewart"],
    traits: {
      mind: { trait: "Extraverted", percentage: 70 },
      energy: { trait: "Intuitive", percentage: 85 },
      nature: { trait: "Thinking", percentage: 75 },
      tactics: { trait: "Prospecting", percentage: 80 }
    },
    growthTips: ["Focus on completing projects you start."],
    careers: ["Inventor", "Lawyer", "Consultant"]
  },

  // Diplomats
  INFJ: {
    code: "INFJ",
    name: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists. INFJs are creative, insightful, principled, and passionate altruists who are always looking to help others.",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    weaknesses: ["Sensitive to criticism", "Reluctant to open up", "Perfectionist", "Avoiding the ordinary", "Prone to burnout"],
    color: "blue",
    gradient: "from-blue-500 to-purple-600",
    famous: ["Martin Luther King Jr.", "Nelson Mandela", "Mother Teresa", "Plato"],
    traits: {
      mind: { trait: "Introverted", percentage: 85 },
      energy: { trait: "Intuitive", percentage: 80 },
      nature: { trait: "Feeling", percentage: 75 },
      tactics: { trait: "Judging", percentage: 70 }
    },
    growthTips: ["Practice self-care and set healthy boundaries."],
    careers: ["Counselor", "Writer", "Teacher"]
  },
  INFP: {
    code: "INFP",
    name: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause. INFPs are guided by their principles, rather than by logic, excitement, or practicality.",
    strengths: ["Empathetic", "Generous", "Open-minded", "Creative", "Passionate"],
    weaknesses: ["Unrealistic", "Self-isolating", "Unfocused", "Emotionally vulnerable", "Desperate to please"],
    color: "teal",
    gradient: "from-teal-500 to-blue-600",
    famous: ["William Shakespeare", "J.R.R. Tolkien", "Vincent van Gogh", "John Lennon"],
    traits: {
      mind: { trait: "Introverted", percentage: 80 },
      energy: { trait: "Intuitive", percentage: 85 },
      nature: { trait: "Feeling", percentage: 90 },
      tactics: { trait: "Prospecting", percentage: 75 }
    },
    growthTips: ["Turn your ideals into practical action steps."],
    careers: ["Artist", "Therapist", "Editor"]
  },
  ENFJ: {
    code: "ENFJ",
    name: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners. ENFJs are passionate altruists who genuinely care about others and want to help them reach their potential.",
    strengths: ["Tolerant", "Reliable", "Charismatic", "Altruistic", "Natural leader"],
    weaknesses: ["Overly idealistic", "Too selfless", "Sensitive", "Fluctuating self-esteem", "Struggle with decisions"],
    color: "pink",
    gradient: "from-pink-500 to-purple-600",
    famous: ["Oprah Winfrey", "Barack Obama", "Maya Angelou", "Martin Luther King Jr."],
    traits: {
      mind: { trait: "Extraverted", percentage: 75 },
      energy: { trait: "Intuitive", percentage: 80 },
      nature: { trait: "Feeling", percentage: 85 },
      tactics: { trait: "Judging", percentage: 70 }
    },
    growthTips: ["Delegate tasks and avoid overcommitting."],
    careers: ["Coach", "Public Speaker", "HR Manager"]
  },
  ENFP: {
    code: "ENFP",
    name: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile. ENFPs are people-centered creators with a focus on possibilities and a contagious enthusiasm.",
    strengths: ["Curious", "Observant", "Energetic", "Excellent communicator", "Festive"],
    weaknesses: ["Poor practical skills", "Difficulty focusing", "Overthinking", "Highly emotional", "Independent to a fault"],
    color: "yellow",
    gradient: "from-yellow-500 to-orange-600",
    famous: ["Robin Williams", "Ellen DeGeneres", "Will Smith", "Robert Downey Jr."],
    traits: {
      mind: { trait: "Extraverted", percentage: 80 },
      energy: { trait: "Intuitive", percentage: 85 },
      nature: { trait: "Feeling", percentage: 80 },
      tactics: { trait: "Prospecting", percentage: 85 }
    },
    growthTips: ["Prioritize and focus on one goal at a time."],
    careers: ["Journalist", "Actor", "Marketing Specialist"]
  },

  // Sentinels
  ISTJ: {
    code: "ISTJ",
    name: "The Logistician",
    description: "Practical and fact-minded, reliable and responsible. ISTJs are hardworking and traditional, and can always be counted on to do the right thing.",
    strengths: ["Honest", "Direct", "Strong-willed", "Dutiful", "Very responsible"],
    weaknesses: ["Stubborn", "Insensitive", "Always by the book", "Judgmental", "Unreasonably blame themselves"],
    color: "indigo",
    gradient: "from-indigo-500 to-blue-600",
    famous: ["Warren Buffett", "George Washington", "Queen Elizabeth II", "Jeff Bezos"],
    traits: {
      mind: { trait: "Introverted", percentage: 75 },
      energy: { trait: "Observant", percentage: 80 },
      nature: { trait: "Thinking", percentage: 70 },
      tactics: { trait: "Judging", percentage: 85 }
    }
  },
  ISFJ: {
    code: "ISFJ",
    name: "The Protector",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones. ISFJs are warm-hearted and dedicated, always ready to protect the people they care about.",
    strengths: ["Supportive", "Reliable", "Patient", "Imaginative", "Observant"],
    weaknesses: ["Humble", "Shy", "Take things personally", "Repress feelings", "Overload themselves"],
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    famous: ["Mother Teresa", "Kate Middleton", "Jimmy Carter", "Rosa Parks"],
    traits: {
      mind: { trait: "Introverted", percentage: 80 },
      energy: { trait: "Observant", percentage: 75 },
      nature: { trait: "Feeling", percentage: 85 },
      tactics: { trait: "Judging", percentage: 80 }
    }
  },
  ESTJ: {
    code: "ESTJ",
    name: "The Executive",
    description: "Excellent administrators, unsurpassed at managing things or people. ESTJs are representatives of tradition and order, using their understanding of what is right and wrong to bring people together.",
    strengths: ["Dedicated", "Strong-willed", "Direct", "Honest", "Loyal"],
    weaknesses: ["Inflexible", "Uncomfortable with unconventional situations", "Judgmental", "Too focused on social status", "Difficult to relax"],
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    famous: ["Franklin D. Roosevelt", "Judge Judy", "John D. Rockefeller", "Lyndon B. Johnson"],
    traits: {
      mind: { trait: "Extraverted", percentage: 75 },
      energy: { trait: "Observant", percentage: 80 },
      nature: { trait: "Thinking", percentage: 75 },
      tactics: { trait: "Judging", percentage: 85 }
    }
  },
  ESFJ: {
    code: "ESFJ",
    name: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help. ESFJs are altruists who take seriously their responsibility to help and to do the right thing.",
    strengths: ["Strong practical skills", "Strong sense of duty", "Very loyal", "Sensitive and warm", "Good at connecting with others"],
    weaknesses: ["Worried about social status", "Inflexible", "Reluctant to innovate", "Vulnerable to criticism", "Often too needy"],
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    famous: ["Taylor Swift", "Danny Glover", "Sam Walton", "Andrew Carnegie"],
    traits: {
      mind: { trait: "Extraverted", percentage: 80 },
      energy: { trait: "Observant", percentage: 75 },
      nature: { trait: "Feeling", percentage: 85 },
      tactics: { trait: "Judging", percentage: 80 }
    }
  },

  // Explorers
  ISTP: {
    code: "ISTP",
    name: "The Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools. ISTPs are tolerant and flexible, they take a pragmatic approach typified by a focus on immediate results.",
    strengths: ["Optimistic", "Energetic", "Creative", "Practical", "Spontaneous"],
    weaknesses: ["Stubborn", "Insensitive", "Private", "Reserved", "Easily bored"],
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    famous: ["Michael Jordan", "Bruce Lee", "Clint Eastwood", "Scarlett Johansson"],
    traits: {
      mind: { trait: "Introverted", percentage: 70 },
      energy: { trait: "Observant", percentage: 80 },
      nature: { trait: "Thinking", percentage: 75 },
      tactics: { trait: "Prospecting", percentage: 85 }
    }
  },
  ISFP: {
    code: "ISFP",
    name: "The Adventurer",
    description: "Flexible and charming artists, always ready to explore new possibilities. ISFPs are gentle caretakers who live in the present moment and enjoy their surroundings with cheerful, low-key enthusiasm.",
    strengths: ["Charming", "Sensitive to others", "Imaginative", "Passionate", "Curious"],
    weaknesses: ["Fiercely independent", "Unpredictable", "Easily stressed", "Overly competitive", "Fluctuating self-esteem"],
    color: "rose",
    gradient: "from-rose-500 to-pink-600",
    famous: ["Michael Jackson", "Avril Lavigne", "Wolfgang Amadeus Mozart", "Britney Spears"],
    traits: {
      mind: { trait: "Introverted", percentage: 75 },
      energy: { trait: "Observant", percentage: 70 },
      nature: { trait: "Feeling", percentage: 80 },
      tactics: { trait: "Prospecting", percentage: 85 }
    }
  },
  ESTP: {
    code: "ESTP",
    name: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge. ESTPs are energetic thrillseekers who are at their best when putting out fires, whether literal or metaphorical.",
    strengths: ["Bold", "Rational", "Practical", "Original", "Perceptive"],
    weaknesses: ["Insensitive", "Impatient", "Risk-prone", "Unstructured", "May miss the bigger picture"],
    color: "lime",
    gradient: "from-lime-500 to-green-600",
    famous: ["Donald Trump", "Ernest Hemingway", "Jack Nicholson", "Madonna"],
    traits: {
      mind: { trait: "Extraverted", percentage: 85 },
      energy: { trait: "Observant", percentage: 80 },
      nature: { trait: "Thinking", percentage: 70 },
      tactics: { trait: "Prospecting", percentage: 85 }
    }
  },
  ESFP: {
    code: "ESFP",
    name: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them. ESFPs are people-focused and fun-loving, making them the most likely of all types to be happy.",
    strengths: ["Bold", "Original", "Aesthetics and showcase", "Practical", "Observant"],
    weaknesses: ["Sensitive", "Conflict-averse", "Easily bored", "Poor long-term planners", "Unfocused"],
    color: "fuchsia",
    gradient: "from-fuchsia-500 to-pink-600",
    famous: ["Marilyn Monroe", "Elvis Presley", "Magic Johnson", "Justin Bieber"],
    traits: {
      mind: { trait: "Extraverted", percentage: 85 },
      energy: { trait: "Observant", percentage: 75 },
      nature: { trait: "Feeling", percentage: 80 },
      tactics: { trait: "Prospecting", percentage: 85 }
    }
  }
};