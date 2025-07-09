"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const error_1 = __importDefault(require("../utils/error"));
// Get all categories
const getCategories = async (req, res) => {
    const categories = await client_1.default.category.findMany({
        include: { products: true },
    });
    res.json(categories);
};
exports.getCategories = getCategories;
// Create a new category
const createCategory = async (req, res) => {
    const { name } = req.body;
    const existingCategory = await client_1.default.category.findUnique({
        where: { name }
    });
    if (existingCategory) {
        throw error_1.default.conflict("Category already exists");
    }
    const category = await client_1.default.category.create({
        data: { name },
    });
    res.status(201).json({
        message: "Category created",
        category,
    });
};
exports.createCategory = createCategory;
