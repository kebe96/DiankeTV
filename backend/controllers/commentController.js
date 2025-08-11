import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: "desc" }
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const userId = req.userId;
  try {
    const comment = await prisma.comment.create({
      data: { content, postId: Number(postId), userId: Number(userId) }
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
