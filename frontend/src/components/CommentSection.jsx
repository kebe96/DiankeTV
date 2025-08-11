import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);

  const load = () => {
    api.get(`/comments/${postId}`).then(res => setComments(res.data)).catch(console.error);
  };

  useEffect(()=> { load(); }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Connectez-vous pour commenter.");
    try {
      await api.post(`/comments/${postId}`, { content: text });
      setText("");
      load();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold mb-3">Commentaires</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea value={text} onChange={e=>setText(e.target.value)} className="textarea textarea-bordered w-full" rows="3" required />
          <button type="submit" className="btn btn-primary">Poster</button>
        </form>
      ) : (
        <p className="text-sm">Connectez-vous pour poster un commentaire.</p>
      )}

      <div className="mt-4 space-y-4">
        {comments.map(c => (
          <div key={c.id} className="p-3 bg-base-100 rounded">
            <div className="text-sm text-gray-600">{c.user?.username} • {new Date(c.createdAt).toLocaleString()}</div>
            <div className="mt-1">{c.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
