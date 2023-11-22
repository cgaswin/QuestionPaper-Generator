import { Question } from "../utils/types";
import { QuestionsArraySchema } from "../schema/question";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import getRandomQuestions from "../utils/getQuestions";
import questionStoreModel from "../models/questionStore.model";
import QuestionRequestSchema from "../schema/questionRequest";

interface Data {
	totalMarks: number;
	totalQuestions: {
		easy: number;
		medium: number;
		hard: number;
	};
	questions: Question[];
}

// Function to add question to the database
export const addQuestionsToDatabase = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const parsedInput = QuestionsArraySchema.safeParse(req.body);
		if (!parsedInput.success) {
			return next(new ApiError(400, parsedInput.error.message));
		}

		const questions = parsedInput.data;

		try {
			await questionStoreModel.insertMany(questions);
			res
				.status(201)
				.json(new ApiResponse(201, "Questions added successfully", questions));
		} catch (error) {
			console.log(error)
			return next(new ApiError(500, "Failed to add questions to the database"));
		}
	}
);

//function to generate question paper
export const generateQuestionPaper = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const parsedInput = QuestionRequestSchema.safeParse(req.body);
		if (!parsedInput.success) {
			return next(new ApiError(400, parsedInput.error.message));
		}
		const { totalMarks, difficultyDistribution } = parsedInput.data;
		const { Easy, Medium, Hard } = difficultyDistribution;
		if (Easy + Medium + Hard !== 100) {
			return next(
				new ApiError(400, "Sum of easy, medium and hard should be 100")
			);
		}

		const easyQuestions: Question[] = await questionStoreModel.find({
			difficulty: "Easy",
		});
		const mediumQuestions: Question[] = await questionStoreModel.find({
			difficulty: "Medium",
		});
		const hardQuestions: Question[] = await questionStoreModel.find({
			difficulty: "Hard",
		});

		const easyQuestionPaper: Question[] = getRandomQuestions(
			easyQuestions,
			Easy,
			totalMarks
		);
		const easyPaperLength: number = easyQuestionPaper.length;

		const mediumQuestionPaper: Question[] = getRandomQuestions(
			mediumQuestions,
			Medium,
			totalMarks
		);

		const mediumPaperLength: number = mediumQuestionPaper.length;

		const hardQuestionPaper: Question[] = getRandomQuestions(
			hardQuestions,
			Hard,
			totalMarks
		);

		const hardPaperLength: number = hardQuestionPaper.length;

		const questionPaper: Question[] = easyQuestionPaper
			.concat(mediumQuestionPaper)
			.concat(hardQuestionPaper);

		//checking if the sum of questions in paper equals 100
		const sum: number = questionPaper.reduce(
			(sum, question) => sum + question.marks,
			0
		);
		if (sum !== 100) {
			return next(
				new ApiError(500, "The sum of marks of these questions is not 100")
			);
		}

		const data: Data = {
			totalMarks: 100,
			totalQuestions: {
				easy: easyPaperLength,
				medium: mediumPaperLength,
				hard: hardPaperLength,
			},
			questions: questionPaper,
		};

		res
			.status(200)
			.json(
				new ApiResponse(200, "Question paper generated successfully", data)
			);
	}
);
