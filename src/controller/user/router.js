import express from "express";
import { verifyToken } from "../../middleware/auth";
import { validate_user_input } from "../../validation";
import { create_user, login, user_details, user_list } from "./controller";

const router = express.Router();

router.get("/list", verifyToken, user_list);
router.get("/details", verifyToken, user_details);
router.post("/post", validate_user_input, create_user);
router.post("/login", login);

export default router;