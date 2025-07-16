export interface QuizResponse {
  questionId: number;
  score: number; // 1-7 scale
}

export interface PersonalityScores {
  mind: number; // negative = Introvert, positive = Extravert
  energy: number; // negative = Observant, positive = Intuitive
  nature: number; // negative = Thinking, positive = Feeling
  tactics: number; // negative = Judging, positive = Prospecting
}

export interface PersonalityResult {
  type: string;
  scores: PersonalityScores;
  percentages: {
    mind: number;
    energy: number;
    nature: number;
    tactics: number;
  };
}

import { questions } from '@/data/questions';

export function calculatePersonalityType(responses: QuizResponse[]): PersonalityResult {
  const scores: PersonalityScores = {
    mind: 0,
    energy: 0,
    nature: 0,
    tactics: 0
  };

  // Calculate raw scores for each dimension
  responses.forEach(response => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;

    // Convert 1-7 scale to -3 to +3 scale
    const normalizedScore = response.score - 4;
    
    // Apply direction multiplier
    const directionMultiplier = question.direction === 'positive' ? 1 : -1;
    const finalScore = normalizedScore * directionMultiplier;

    // Add to appropriate dimension
    scores[question.dimension] += finalScore;
  });

  // Determine personality type
  const mind = scores.mind >= 0 ? 'E' : 'I';
  const energy = scores.energy >= 0 ? 'N' : 'S';
  const nature = scores.nature >= 0 ? 'F' : 'T';
  const tactics = scores.tactics >= 0 ? 'P' : 'J';

  const type = mind + energy + nature + tactics;

  // Calculate percentages (0-100 scale)
  const maxScore = 3 * 14; // 3 points max per question, ~14 questions per dimension
  const percentages = {
    mind: Math.round(((Math.abs(scores.mind) / maxScore) * 50) + 50),
    energy: Math.round(((Math.abs(scores.energy) / maxScore) * 50) + 50),
    nature: Math.round(((Math.abs(scores.nature) / maxScore) * 50) + 50),
    tactics: Math.round(((Math.abs(scores.tactics) / maxScore) * 50) + 50)
  };

  return {
    type,
    scores,
    percentages
  };
}

export function saveQuizProgress(responses: QuizResponse[], currentQuestion: number) {
  localStorage.setItem('personalityQuiz_responses', JSON.stringify(responses));
  localStorage.setItem('personalityQuiz_currentQuestion', currentQuestion.toString());
}

export function loadQuizProgress(): { responses: QuizResponse[], currentQuestion: number } | null {
  try {
    const responses = localStorage.getItem('personalityQuiz_responses');
    const currentQuestion = localStorage.getItem('personalityQuiz_currentQuestion');
    
    if (responses && currentQuestion) {
      return {
        responses: JSON.parse(responses),
        currentQuestion: parseInt(currentQuestion)
      };
    }
  } catch (error) {
    console.error('Error loading quiz progress:', error);
  }
  return null;
}

export function clearQuizProgress() {
  localStorage.removeItem('personalityQuiz_responses');
  localStorage.removeItem('personalityQuiz_currentQuestion');
}

export function saveQuizResult(result: PersonalityResult) {
  localStorage.setItem('personalityQuiz_result', JSON.stringify(result));
}

export function loadQuizResult(): PersonalityResult | null {
  try {
    const result = localStorage.getItem('personalityQuiz_result');
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Error loading quiz result:', error);
    return null;
  }
}