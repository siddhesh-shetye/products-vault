"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMyProfile = exports.getMyProfile = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_1 = __importDefault(require("../utils/error"));
// Get current user's profile
const getMyProfile = async (req, res) => {
    const userId = req.user.userId;
    const profile = await client_1.default.profile.findUnique({
        where: { userId },
    });
    if (!profile) {
        throw error_1.default.notFound("Profile not found");
    }
    res.json(profile);
};
exports.getMyProfile = getMyProfile;
// Update current user's profile
const updateMyProfile = async (req, res) => {
    const userId = req.user.userId;
    const { firstName, lastName, phone, address } = req.body;
    const existingProfile = await client_1.default.profile.findUnique({
        where: { userId },
    });
    if (!existingProfile) {
        throw error_1.default.notFound("Profile not found");
    }
    const updatedProfile = await client_1.default.profile.update({
        where: { userId },
        data: { firstName, lastName, phone, address },
    });
    res.json({
        message: "Profile updated successfully",
        profile: updatedProfile,
    });
};
exports.updateMyProfile = updateMyProfile;
