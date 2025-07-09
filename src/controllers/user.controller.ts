import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/error";

// Register User
export const registerUser = async (req: Request, res: Response) => {
    const { email, password, profile } = req.body;

    // Check email exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw AppError.conflict("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User & Profile
    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            profile: {
                create: profile,
            },
        },
        include: { profile: true },
    });

    res.status(201).json({
        message: "Registration successful",
        user,
    });
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email },
        include: { profile: true },
    });

    if (!user) {
        throw AppError.unauthorized("Invalid email or password");
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw AppError.unauthorized("Invalid email or password");
    }

    // Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });

    res.json({
        message: "Login successful",
        token,
        user,
    });
};