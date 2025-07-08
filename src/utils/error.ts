// src/utils/AppError.ts

export default class AppError extends Error {
    public statusCode: number;
    // public description: string;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        // this.description = description;
    }

    static badRequest(message = "Bad Request") {
        return new AppError(message, 400);
    }

    static unauthorized(message = "Unauthorized") {
        return new AppError(message, 401);
    }

    static forbidden(message = "Forbidden") {
        return new AppError(message, 403);
    }

    static notFound(message = "Not Found") {
        return new AppError(message, 404);
    }

    static conflict(message = "Conflict") {
        return new AppError(message, 409);
    }

    static validationError(message = "Validation Error") {
        return new AppError(message, 422);
    }

    static serverError(message = "Internal Server Error") {
        return new AppError(message, 500, false);
    }
}