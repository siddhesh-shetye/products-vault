import { Router } from "express";
import { getCategories, createCategory } from "../controllers/category.controller";
import { authenticateToken } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createCategorySchema } from "../validators/category";

const router = Router();

router.get("/", getCategories);
router.post("/", authenticateToken, validate(createCategorySchema), createCategory);

export default router;