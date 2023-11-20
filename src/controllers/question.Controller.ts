import { Question } from "../utils/types";
import { QuestionsArraySchema} from "../schema/question";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import getRandomQuestions from "../utils/getRandomQuestion";
import questionStoreModel from "../models/questionStore.model";
import QuestionRequestSchema from "../schema/questionRequest";

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
			res.status(201).json({
				success: true,
				message: "Questions added successfully",
			});
		} catch (error) {
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
		const { easy, medium, hard } = difficultyDistribution;

		// Calculate the number of questions for each difficulty level
		const easyQuestions = Math.round(totalMarks * (easy / 100));
		const mediumQuestions = Math.round(totalMarks * (medium / 100));
		const hardQuestions = Math.round(totalMarks * (hard / 100));

		// Query the database to fetch questions based on difficulty level
		const easyQuestionsList = await questionStoreModel
			.find({ difficulty: "Easy" })
			.limit(easyQuestions);
		const mediumQuestionsList = await questionStoreModel
			.find({
				difficulty: "Medium",
			})
			.limit(mediumQuestions);
		const hardQuestionsList = await questionStoreModel
			.find({ difficulty: "Hard" })
			.limit(hardQuestions);

		// Randomly select the required number of questions from each difficulty level
		const selectedQuestions: Question[] = [];
		selectedQuestions.push(
			...getRandomQuestions(easyQuestionsList, easyQuestions)
		);
		selectedQuestions.push(
			...getRandomQuestions(mediumQuestionsList, mediumQuestions)
		);
		selectedQuestions.push(
			...getRandomQuestions(hardQuestionsList, hardQuestions)
		);

		res.status(200).json({
			success: true,
			questions: selectedQuestions,
		})
	}
);
