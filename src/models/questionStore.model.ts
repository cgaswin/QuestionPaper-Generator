import mongoose from "mongoose";
import { Question } from "../utils/types";

const questionStoreModel = new mongoose.Schema<Question>({
	question: {
		type: String,
		required: [true, "Please provide question"],
	},
	subject: {
		type: String,
		required: [true, "Please provide subject"],
	},
	topic: {
		type: String,
		required: [true, "Please provide topic"],
	},
	difficulty: {
		type: String,
		required: [true, "Please provide difficulty"],
	},
	marks: {
		type: Number,
		required: [true, "Please provide marks"],
	},
});

export default mongoose.model<Question>("questionStore", questionStoreModel);
