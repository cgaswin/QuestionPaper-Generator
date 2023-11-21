import { z } from "zod";

const QuestionRequestSchema = z.object({
	totalMarks: z.number(),
	difficultyDistribution: z.object({
		Easy: z.number(),
		Medium: z.number(),
		Hard:z.number()
	})
	
});

export type QuestionRequest = z.infer<typeof QuestionRequestSchema>;

export default QuestionRequestSchema;
