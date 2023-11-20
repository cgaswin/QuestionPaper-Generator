import questionStoreModel from "../models/questionStore.model";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/apiError";
import questions from "../seeds/questions.json"

//add questions to databse

const seedQuestions = asyncHandler(async (req: Request, res: Response) => {
    await questionStoreModel.deleteMany({}) //delete existing questions

    await questionStoreModel.insertMany(questions) //insert new questions

    return res.status(201).json({
        success: true,
        message:"Questions added successfully"
    })

})
