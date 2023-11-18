import mongoose from "mongoose";
import { Question } from "../utils/types";

const questionStoreModel = new mongoose.Schema<Question>({
    subject: {
        type: String,
        required: [true, "Please provide subject"]
    },
    topic: {
        type: String,
        required: [true, "Please provide topic"]
    },
    difficulty: {
        type: String,
        required: [true, "Please provide difficulty"]
    },
    marks: {
        type: Number,
        required: [true, "Please provide marks"]
    },
    question: {
        type: String,
        required: [true, "Please provide question"]
    },
});

export default mongoose.model<Question>("questionStore", questionStoreModel);
