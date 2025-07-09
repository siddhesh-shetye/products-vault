import { Router } from "express";
import { getMyProfile, updateMyProfile } from "../controllers/profile.controller";
import { authenticateToken } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { profile } from "../validators/profile";

const router = Router();

// GET /api/profile - fetch current user's profile
router.get("/", authenticateToken, getMyProfile);

// PUT /api/profile - update current user's profile
router.put("/", authenticateToken, validate(profile), updateMyProfile);


export default router;