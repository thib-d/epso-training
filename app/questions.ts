import frQuestions from './data/questions.fr.json';
import enQuestions from './data/questions.en.json';

export type Language = 'fr' | 'en';
export type Category = 'verbal' | 'numerical' | 'abstract';
export type Question = {
  id: number;
  category: Category;
  prompt: Record<Language, string>;
  options: Record<Language, string[]>;
  answer: number;
  explanation: Record<Language, string>;
};

type LocalizedQuestion = {
  id: number;
  category: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
};

const englishById = new Map(
  (enQuestions as LocalizedQuestion[]).map((question) => [question.id, question]),
);

export const questions: Question[] = (frQuestions as LocalizedQuestion[]).map((fr) => {
  const en = englishById.get(fr.id);
  if (!en || en.category !== fr.category || en.answer !== fr.answer) {
    throw new Error(`Invalid bilingual question pair for id ${fr.id}`);
  }
  return {
    id: fr.id,
    category: fr.category as Category,
    prompt: { fr: fr.prompt, en: en.prompt },
    options: { fr: fr.options, en: en.options },
    answer: fr.answer,
    explanation: { fr: fr.explanation, en: en.explanation },
  };
});

if (questions.length !== 100) {
  throw new Error(`Expected 100 questions, got ${questions.length}`);
}
