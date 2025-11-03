import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { themeContext } from "../../App";

export default function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(),
      title,
      content,
    };

    setPosts((prev) => [...prev, newPost]);

    setTitle("");
    setContent("");
  };

  return (
    <Layout>
      <div className={`min-h-[84vh] p-6 flex justify-center ${isDark ? "bg-gray-900" : "bg-bgColor"}`}>
        <div className={`w-full max-w-2xl shadow-lg rounded-xl p-5 ${isDark ? "bg-gray-800" : "bg-red-100"}`}>
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">Blog</h1>

          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />

            <textarea
              placeholder="Blog Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg h-24 focus:ring focus:ring-blue-300"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Add Blog
            </button>
          </form>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No blog posts yet...</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div key={post.id} className="p-4 border rounded-lg bg-gray-50 shadow">
                  <h2 className="font-bold text-lg">{post.title}</h2>
                  <p className="text-gray-700 mb-2">{post.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
