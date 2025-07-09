"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = __importDefault(require("../utils/error"));
// Register User
const registerUser = async (req, res) => {
    const { email, password, profile } = req.body;
    // Check email exists
    const existingUser = await client_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw error_1.default.conflict("Email already registered");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Create User & Profile
    const user = await client_1.default.user.create({
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
exports.registerUser = registerUser;
// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // Find user by email
    const user = await client_1.default.user.findUnique({
        where: { email },
        include: { profile: true },
    });
    if (!user) {
        throw error_1.default.unauthorized("Invalid email or password");
    }
    // Compare password
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        throw error_1.default.unauthorized("Invalid email or password");
    }
    // Token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.json({
        message: "Login successful",
        token,
        user,
    });
};
exports.loginUser = loginUser;
