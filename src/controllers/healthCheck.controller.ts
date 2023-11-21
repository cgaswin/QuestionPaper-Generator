import { Request,Response,NextFunction } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const healthCheck = asyncHandler(async (req: Request, res: Response, next: NextFunction) => { 

    return res.status(200).json(new ApiResponse(200, "Server is up and running",{}));

})