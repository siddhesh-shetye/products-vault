import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/error";

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const parseResult = schema.safeParse(req.body);
    
    if (!parseResult.success) {
        const message = parseResult.error.issues.map(e => e.message).join(", ");
        throw AppError.validationError(message);
    }
    
    req.body = parseResult.data;
    next();
};