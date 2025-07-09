import { Request, Response } from "express";
import prisma from "../prisma/client";
import AppError from "../utils/error";

// Get current user's profile
export const getMyProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;

    const profile = await prisma.profile.findUnique({
        where: { userId },
    });

    if (!profile) {
        throw AppError.notFound("Profile not found");
    }

    res.json(profile);
};

// Update current user's profile
export const updateMyProfile = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const { firstName, lastName, phone, address } = req.body;

    const existingProfile = await prisma.profile.findUnique({
        where: { userId },
    });

    if (!existingProfile) {
        throw AppError.notFound("Profile not found");
    }

    const updatedProfile = await prisma.profile.update({
        where: { userId },
        data: { firstName, lastName, phone, address },
    });

    res.json({
        message: "Profile updated successfully",
        profile: updatedProfile,
    });
};