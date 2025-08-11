import { useEffect, useState } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(()=> {
    api.get("/posts").then(res => setPosts(res.data)).catch(console.error);
  }, []);
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      {posts.map(p => (
        <article key={p.id} className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold">{p.title}</h2>
          <p className="text-sm text-gray-600">{new Date(p.createdAt).toLocaleDateString()}</p>
          <p className="mt-2 text-gray-700">{p.excerpt}</p>
          <Link to={`/post/${p.slug}`} className="text-accent mt-3 inline-block">Lire la suite</Link>
        </article>
      ))}
    </div>
  );
}
