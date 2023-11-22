import { Router } from "express";

import {
	addQuestionsToDatabase,
	generateQuestionPaper,
} from "../controllers/question.Controller";

const router: Router = Router();

router.route("/add").post(addQuestionsToDatabase);
router.route("/generate").post(generateQuestionPaper);

export default router;
