import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostList from "./components/PostList";
import PostPage from "./components/PostPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <header className="p-4 bg-white shadow">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-xl">DiankéTV Blog</Link>
            <nav className="space-x-4">
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
