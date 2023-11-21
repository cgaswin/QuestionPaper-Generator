import { Question } from "./types";
import { ApiError } from "./ApiError";

function subsetSumRecursive(
	questions: Question[],
	target: number,
	index: number,
	memo: Map<string, Question[] | null> = new Map()
): Question[] | null {
	// Convert the current state to a string to use as a key in the memo map
	const key = `${target}-${index}`;

	// If the result of this state is in the memo map, return it
	if (memo.has(key)) {
		return memo.get(key) || null;
	}

	// Base case
	if (target == 0) {
		return [];
	}
	if (index == questions.length) {
		return null;
	}

	// Recursive case, we include the current question or exclude it
	const include = subsetSumRecursive(
		questions,
		target - questions[index].marks,
		index + 1,
		memo
	);
	if (include != null) {
		include.push(questions[index]);
		memo.set(key, include);
		return include;
	}
	const exclude = subsetSumRecursive(questions, target, index + 1, memo);
	memo.set(key, exclude);
	return exclude;
}

// Helper function to randomly select questions from a given list
const getRandomQuestions = (
	questionsList: Question[],
	percentage: number,
	target: number
): Question[] => {
	//handling percentage = 0 edge case
	if (percentage === 0) {
		return [];
	}

	// Get the sum of marks of all the questions in the totalQuestions
	const totalMarks: number = questionsList.reduce(
		(sum, question) => sum + question.marks,
		0
	);
	console.log(totalMarks);
	const marksRequired = Math.floor((percentage / 100) * target);

	if (marksRequired > totalMarks) {
		throw new ApiError(
			400,
			"Not enough questions in the database to generate the question paper. Please try again with a lower number of questions."
		);
	}

	const result: Question[] | null = subsetSumRecursive(
		questionsList,
		marksRequired,
		0
	);
	if (result != null) {
		return result;
	} else {
		throw new ApiError(400, "No questions found for the given criteria.");
	}
};

export default getRandomQuestions;
