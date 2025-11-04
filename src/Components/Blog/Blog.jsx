import React, { useContext, useState } from "react";
import Layout from "../Pages/Layout";
import { themeContext } from "../../App";

export default function BlogApp() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    if (editId) {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editId ? { ...post, title, content } : post
        )
      );
      setEditId(null);
    } else {
      setPosts([...posts, { id: Date.now(), title, content }]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
  };

  return (
    <Layout>
      <div
        className={`min-h-[84.40vh] p-6 flex justify-center ${
          isDark ? "bg-gray-900" : "bg-bgColor"
        }`}
      >
        <div
          className={`w-full max-w-2xl shadow-lg rounded-xl p-5 ${
            isDark ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-5">
            Blog
          </h1>

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
              {editId ? "Update Blog" : "Add Blog"}
            </button>
          </form>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-center">No blog posts yet...</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 border rounded-lg bg-gray-50 shadow"
                >
                  <h2 className="font-bold text-lg">{post.title}</h2>
                  <p className="text-gray-700 mb-2">{post.content}</p>

                  <div className="flex gap-3">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleEdit(post)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
