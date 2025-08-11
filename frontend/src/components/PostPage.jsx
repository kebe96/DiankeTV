import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import ReactMarkdown from "react-markdown";
import CommentSection from "./CommentSection";

export default function PostPage(){
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(()=> {
    api.get(`/posts/${slug}`).then(res => setPost(res.data)).catch(console.error);
  }, [slug]);

  if (!post) return <p className="p-6">Chargement...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className="prose mt-6">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <CommentSection postId={post.id} />
    </div>
  );
}
