import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../validators/user";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;