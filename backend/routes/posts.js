import express from "express";
import {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);

// routes protégées pour créer/modifier/supprimer (admin)
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
