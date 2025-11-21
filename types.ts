export type QuestionType = 'MCQ' | 'TF' | 'ESSAY';

export interface BaseQuestion {
  id: number;
  text: string;
  type: QuestionType;
}

export interface MCQQuestion extends BaseQuestion {
  type: 'MCQ';
  options: string[];
  correctAnswerIndex: number;
}

export interface TFQuestion extends BaseQuestion {
  type: 'TF';
  correctAnswer: boolean;
}

export interface EssayQuestion extends BaseQuestion {
  type: 'ESSAY';
}

export type Question = MCQQuestion | TFQuestion | EssayQuestion;

export interface AIResponse {
  score: number;
  feedback: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  icon: string; // Simple string identifier for icon selection
  mcqQuestions: Question[];
  tfQuestions: Question[];
  essayQuestions: Question[];
}