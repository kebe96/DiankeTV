import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await prisma.post.findUnique({ where: { slug } });
    if (!post) return res.status(404).json({ error: "Post non trouvé" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  const { title, slug, excerpt, content, tags, published } = req.body;
  try {
    const post = await prisma.post.create({ data: { title, slug, excerpt, content, tags, published } });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const post = await prisma.post.update({ where: { id: Number(id) }, data });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id: Number(id) } });
    res.json({ message: "Supprimé" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
