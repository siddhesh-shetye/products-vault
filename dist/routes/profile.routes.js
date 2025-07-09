"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const auth_1 = require("../middlewares/auth");
const validate_1 = require("../middlewares/validate");
const profile_1 = require("../validators/profile");
const router = (0, express_1.Router)();
// GET /api/profile - fetch current user's profile
router.get("/", auth_1.authenticateToken, profile_controller_1.getMyProfile);
// PUT /api/profile - update current user's profile
router.put("/", auth_1.authenticateToken, (0, validate_1.validate)(profile_1.profile), profile_controller_1.updateMyProfile);
exports.default = router;
