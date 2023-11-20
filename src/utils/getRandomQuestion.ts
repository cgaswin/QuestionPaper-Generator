import { Question } from "./types";
import { ApiError } from "../errors/apiError";

// Helper function to randomly select questions from a given list
const getRandomQuestions = (
	questionsList: Question[],
	count: number
): Question[] => {
	const selectedQuestions: Question[] = [];
	const totalQuestions = questionsList.length;

	if (count > totalQuestions) {
		throw new ApiError(
			400,
			"Not enough questions in the database to generate the question paper. Please try again with a lower number of questions."
		);
	}

	while (selectedQuestions.length < count) {
		const randomIndex = Math.floor(Math.random() * totalQuestions);
		const randomQuestion = questionsList[randomIndex];

		if (!selectedQuestions.includes(randomQuestion)) {
			selectedQuestions.push(randomQuestion);
		}
	}

	return selectedQuestions;
};

export default getRandomQuestions;
