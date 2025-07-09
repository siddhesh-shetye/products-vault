import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { register, login } from "../validators/user";

const router = Router();

router.post("/register", validate(register), registerUser);
router.post("/login", validate(login), loginUser);

export default router;