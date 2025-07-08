import { Request, Response } from "express";
import prisma from "../prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../utils/error";

export const registerUser = async (req: Request, res: Response) => {
    const { email, password, profile } = req.body;
    if (!email || !password) throw AppError.badRequest("All fields are required");

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw AppError.conflict("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.status(201).json({ message: "Registration successful", token, user });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) throw AppError.badRequest("Email and password are required");

    const user = await prisma.user.findUnique({ where: { email }, include: { profile: true } });
    if (!user) throw AppError.unauthorized("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password!);
    if (!isValid) throw AppError.unauthorized("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user });
};