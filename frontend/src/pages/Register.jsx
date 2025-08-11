import { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handle = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { username, email, password });
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      alert("Inscription ok !");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur");
    }
  };

  return (
    <form onSubmit={handle} className="max-w-md mx-auto p-6 space-y-4">
      <input className="input input-bordered w-full" placeholder="Pseudo" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input className="input input-bordered w-full" type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button className="btn btn-accent w-full" type="submit">S'inscrire</button>
    </form>
  );
}
