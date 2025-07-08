import { Router } from "express";
import { getProfiles, createProfile } from "../controllers/profile.controller";

const router = Router();

router.get("/", getProfiles);
router.post("/", createProfile);

export default router;