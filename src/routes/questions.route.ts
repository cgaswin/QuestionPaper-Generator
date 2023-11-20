import { Router } from "express";

import {
	addQuestionToDatabase,
	generateQuestionPaper,
} from "../controllers/question.Controller";

const router: Router = Router();

router.route("/add").post(addQuestionToDatabase);
router.route("/generate").get(generateQuestionPaper);

export default router;
