import e from 'express';
import { z } from 'zod';

const QuestionSchema = z.object({
    question: z.string(),
    subject: z.string(),
    topic: z.string(),
    difficulty: z.string(),
    marks: z.number(),
})

const QuestionsArraySchema = z.array(QuestionSchema);


export type Question = z.infer<typeof QuestionSchema>;
export type QuestionsArray = z.infer<typeof QuestionsArraySchema>;

export {QuestionSchema, QuestionsArraySchema};