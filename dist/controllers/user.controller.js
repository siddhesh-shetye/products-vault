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
const registerUser = async (req, res) => {
    const { email, password, profile } = req.body;
    if (!email || !password)
        throw error_1.default.badRequest("All fields are required");
    const existingUser = await client_1.default.user.findUnique({ where: { email } });
    if (existingUser)
        throw error_1.default.conflict("Email already exists");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
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
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ message: "Registration successful", token, user });
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw error_1.default.badRequest("Email and password are required");
    const user = await client_1.default.user.findUnique({ where: { email }, include: { profile: true } });
    if (!user)
        throw error_1.default.unauthorized("Invalid credentials");
    const isValid = await bcryptjs_1.default.compare(password, user.password);
    if (!isValid)
        throw error_1.default.unauthorized("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user });
};
exports.loginUser = loginUser;
