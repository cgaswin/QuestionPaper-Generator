import { z } from 'zod';

const QuestionSchema = z.object({
    question: z.string(),
    subject: z.string(),
    topic: z.string(),
    difficulty: z.string(),
    marks: z.number(),
})


export type Question = z.infer<typeof QuestionSchema>;

export default QuestionSchema;