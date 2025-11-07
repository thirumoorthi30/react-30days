import React, { useContext, useState } from "react";
import Layout from "../Pages/Layout";
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

    setPosts([...posts, { id: Date.now(), title, content, isEditing: false }]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isEditing: true,
              editTitle: p.title,
              editContent: p.content,
            }
          : { ...p, isEditing: false }
      )
    );
  };

  const handleSave = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              title: p.editTitle,
              content: p.editContent,
              isEditing: false,
              editTitle: undefined,
              editContent: undefined,
            }
          : p
      )
    );
  };

  const handleCancel = (id) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isEditing: false } : p))
    );
  };

  const handleChange = (id, field, value) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 ${
                isDark ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
            />

            <textarea
              placeholder="Blog Content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg h-24 focus:ring focus:ring-blue-300 ${
                isDark ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
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
                <div
                  key={post.id}
                  className={`p-4 border rounded-lg ${
                    isDark ? "bg-gray-700" : "bg-gray-50"
                  } shadow`}
                >
                  {post.isEditing ? (
                    <>
                      <input
                        type="text"
                        value={post.editTitle}
                        onChange={(e) =>
                          handleChange(post.id, "editTitle", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300 mb-2 ${
                          isDark
                            ? "bg-gray-600 text-white"
                            : "bg-white text-black"
                        }`}
                      />
                      <textarea
                        value={post.editContent}
                        onChange={(e) =>
                          handleChange(post.id, "editContent", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg h-20 focus:ring focus:ring-blue-300 mb-2 ${
                          isDark
                            ? "bg-gray-600 text-white"
                            : "bg-white text-blue"
                        }`}
                      />
                      <div className="flex gap-3">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          onClick={() => handleSave(post.id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                          onClick={() => handleCancel(post.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="font-bold text-lg">{post.title}</h2>
                      <p className="text-red-500 mb-2">{post.content}</p>
                      <div className="flex gap-3">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={() => handleEdit(post.id)}
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
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
