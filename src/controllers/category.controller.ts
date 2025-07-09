import { Request, Response } from "express";
import prisma from "../prisma/client";
import AppError from "../utils/error";

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        include: { products: true },
    });

    res.json(categories);
};

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    const existingCategory = await prisma.category.findUnique({
        where: { name },
    });

    if (existingCategory) {
        throw AppError.conflict("Category already exists");
    }

    const category = await prisma.category.create({
        data: { name },
    });

    res.status(201).json({
        message: "Category created",
        category,
    });
};