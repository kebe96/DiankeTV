import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRouter from "./routes/posts.js";
import authRouter from "./routes/auth.js";
import commentRouter from "./routes/comments.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
