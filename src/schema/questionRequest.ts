import { z } from "zod";

const QuestionRequestSchema = z.object({
	totalMarks: z.number(),
	difficultyDistribution: z.object({
		easy: z.number(),
		medium: z.number(),
		hard:z.number()
	})
	
});

export type QuestionRequest = z.infer<typeof QuestionRequestSchema>;

export default QuestionRequestSchema;
