import express from "express";
import { getCommentsByPost, createComment } from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/:postId", getCommentsByPost);
router.post("/:postId", authMiddleware, createComment);

export default router;
