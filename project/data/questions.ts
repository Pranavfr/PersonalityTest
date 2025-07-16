export interface Question {
  id: number;
  text: string;
  dimension: 'mind' | 'energy' | 'nature' | 'tactics';
  direction: 'positive' | 'negative'; // positive = E/N/F/P, negative = I/S/T/J
}

export const questions: Question[] = [
  // Mind dimension (Introvert vs Extrovert)
  { id: 1, text: "You enjoy being the center of attention at social gatherings.", dimension: 'mind', direction: 'positive' },
  { id: 2, text: "You prefer working in a quiet environment without interruptions.", dimension: 'mind', direction: 'negative' },
  { id: 3, text: "You feel energized after spending time with a large group of people.", dimension: 'mind', direction: 'positive' },
  { id: 4, text: "You often need time alone to recharge after social interactions.", dimension: 'mind', direction: 'negative' },
  { id: 5, text: "You tend to speak your thoughts out loud as you think.", dimension: 'mind', direction: 'positive' },
  { id: 6, text: "You prefer to think things through thoroughly before speaking.", dimension: 'mind', direction: 'negative' },
  { id: 7, text: "You actively seek out new social connections and networking opportunities.", dimension: 'mind', direction: 'positive' },
  { id: 8, text: "You prefer deep conversations with a few close friends over small talk with many.", dimension: 'mind', direction: 'negative' },
  { id: 9, text: "You feel comfortable approaching strangers and starting conversations.", dimension: 'mind', direction: 'positive' },
  { id: 10, text: "You prefer written communication over face-to-face discussions for complex topics.", dimension: 'mind', direction: 'negative' },
  { id: 11, text: "You enjoy brainstorming ideas in group settings.", dimension: 'mind', direction: 'positive' },
  { id: 12, text: "You do your best work when you can focus without social distractions.", dimension: 'mind', direction: 'negative' },
  { id: 13, text: "You tend to share personal information openly with others.", dimension: 'mind', direction: 'positive' },
  { id: 14, text: "You keep your personal thoughts and feelings private until you know someone well.", dimension: 'mind', direction: 'negative' },

  // Energy dimension (Intuitive vs Observant/Sensing)
  { id: 15, text: "You focus more on possibilities and potential than current realities.", dimension: 'energy', direction: 'positive' },
  { id: 16, text: "You prefer practical, concrete information over abstract theories.", dimension: 'energy', direction: 'negative' },
  { id: 17, text: "You often think about future implications rather than present details.", dimension: 'energy', direction: 'positive' },
  { id: 18, text: "You pay close attention to specific facts and details when learning something new.", dimension: 'energy', direction: 'negative' },
  { id: 19, text: "You enjoy exploring innovative ideas and unconventional approaches.", dimension: 'energy', direction: 'positive' },
  { id: 20, text: "You prefer tried-and-true methods over experimental approaches.", dimension: 'energy', direction: 'negative' },
  { id: 21, text: "You often see patterns and connections that others might miss.", dimension: 'energy', direction: 'positive' },
  { id: 22, text: "You trust information that comes from direct experience and observation.", dimension: 'energy', direction: 'negative' },
  { id: 23, text: "You find theoretical discussions and abstract concepts fascinating.", dimension: 'energy', direction: 'positive' },
  { id: 24, text: "You prefer step-by-step instructions and clear, concrete examples.", dimension: 'energy', direction: 'negative' },
  { id: 25, text: "You often imagine alternative scenarios and 'what if' possibilities.", dimension: 'energy', direction: 'positive' },
  { id: 26, text: "You focus on what is happening now rather than what might happen.", dimension: 'energy', direction: 'negative' },
  { id: 27, text: "You enjoy brainstorming creative solutions to problems.", dimension: 'energy', direction: 'positive' },
  { id: 28, text: "You prefer working with established procedures and proven methods.", dimension: 'energy', direction: 'negative' },

  // Nature dimension (Thinking vs Feeling)
  { id: 29, text: "You prioritize logic and objective analysis when making decisions.", dimension: 'nature', direction: 'negative' },
  { id: 30, text: "You consider how your decisions will affect other people's feelings.", dimension: 'nature', direction: 'positive' },
  { id: 31, text: "You believe that being right is more important than being tactful.", dimension: 'nature', direction: 'negative' },
  { id: 32, text: "You value harmony and try to avoid conflict in your relationships.", dimension: 'nature', direction: 'positive' },
  { id: 33, text: "You make decisions based on facts and data rather than emotions.", dimension: 'nature', direction: 'negative' },
  { id: 34, text: "You trust your gut feelings and emotional responses when making choices.", dimension: 'nature', direction: 'positive' },
  { id: 35, text: "You believe criticism should be direct and honest, even if it hurts.", dimension: 'nature', direction: 'negative' },
  { id: 36, text: "You prefer to give feedback in a gentle, encouraging way.", dimension: 'nature', direction: 'positive' },
  { id: 37, text: "You focus on efficiency and effectiveness over personal considerations.", dimension: 'nature', direction: 'negative' },
  { id: 38, text: "You believe that everyone's feelings and perspectives should be considered.", dimension: 'nature', direction: 'positive' },
  { id: 39, text: "You see yourself as more logical than emotional.", dimension: 'nature', direction: 'negative' },
  { id: 40, text: "You see yourself as more compassionate than analytical.", dimension: 'nature', direction: 'positive' },
  { id: 41, text: "You believe the best decisions are made with objective reasoning.", dimension: 'nature', direction: 'negative' },
  { id: 42, text: "You believe the best decisions consider both logic and human values.", dimension: 'nature', direction: 'positive' },

  // Tactics dimension (Judging vs Prospecting/Perceiving)
  { id: 43, text: "You prefer to have a clear plan and schedule for your day.", dimension: 'tactics', direction: 'negative' },
  { id: 44, text: "You like to keep your options open and adapt as situations change.", dimension: 'tactics', direction: 'positive' },
  { id: 45, text: "You feel uncomfortable when things are left unresolved or undecided.", dimension: 'tactics', direction: 'negative' },
  { id: 46, text: "You enjoy the flexibility of changing plans when something better comes up.", dimension: 'tactics', direction: 'positive' },
  { id: 47, text: "You prefer to complete tasks well before their deadlines.", dimension: 'tactics', direction: 'negative' },
  { id: 48, text: "You work best under pressure and often do your best work at the last minute.", dimension: 'tactics', direction: 'positive' },
  { id: 49, text: "You like to organize your environment and keep things tidy.", dimension: 'tactics', direction: 'negative' },
  { id: 50, text: "You don't mind a bit of clutter and prefer a more relaxed approach to organization.", dimension: 'tactics', direction: 'positive' },
  { id: 51, text: "You prefer to settle matters quickly and move on to the next task.", dimension: 'tactics', direction: 'negative' },
  { id: 52, text: "You like to explore all options thoroughly before making a final decision.", dimension: 'tactics', direction: 'positive' },
  { id: 53, text: "You feel more comfortable with structure and predictable routines.", dimension: 'tactics', direction: 'negative' },
  { id: 54, text: "You enjoy spontaneity and are comfortable with uncertainty.", dimension: 'tactics', direction: 'positive' },
];