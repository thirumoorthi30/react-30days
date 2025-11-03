import { Link } from "react-router-dom";
import { themeContext } from "../../App";
import { useContext } from "react";

let user = "Thiru";

const projects = [
  { day: "01", title: "Profile Card", path: "/profile-card" },
  { day: "02", title: "Counter App", path: "/counter-app" },
  // { day: "03", title: "Practice App", path: `/practice-app/${user}` },
  { day: "03", title: "Todo List", path: "/todo-list" },
  // { day: "05", title: "Product practice", path: "/product" },
  // { day: "05.01", title: "Add Product", path: "/new-product" },
  // { day: "05.02", title: "Update Product", path: "/update-product/:id" },
  { day: "04", title: "Digital Clock", path: "/digital-clock" },
  { day: "05", title: "Joke App", path: "/joke-app" },
  { day: "06", title: "Weather App", path: "/weather-app" },
  { day: "07", title: "Shopping", path: "/shoppingcart" },
  { day: "08", title: "Blog Post", path: "/blog" },
];

export default function Home() {
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-[calc(100vh-64px)] p-6 ${
        isDark ? "bg-gray-900" : "bg-bgColor"
      }`}
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-700 dark:text-yellow-300">
        🚀 React 30-Day Challenge
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {projects.map((p) => (
          <Link
            key={p.day}
            to={p.path}
            className="
              block p-6 
              rounded-xl shadow-md 
              bg-white text-gray-800 
              dark:bg-gray-800 dark:text-gray-200 
              border border-gray-200 dark:border-gray-700
              hover:bg-blue-200 dark:hover:bg-blue-700
              hover:shadow-xl hover:-translate-y-1 
              transition transform duration-300
            "
          >
            <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
              Day {p.day}
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mt-2">{p.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
