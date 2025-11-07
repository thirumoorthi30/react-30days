import React, { useState, useEffect, useContext } from "react";
import Layout from "../Pages/Layout";
import { themeContext } from "../../App";

function JokeApp() {
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");

  const fetchJoke = () => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Something went wrong...");
      })
      .then((data) => setJoke(data))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  return (
    <Layout>
      <div
        className={`flex flex-col items-center justify-center min-h-[84.40vh] text-center p-6 transition-all
        ${isDark ? "bg-gray-900" : "bg-bgColor"}`}
      >
        <h1 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400">
          Joke App
        </h1>

        <div className="border border-gray-300 dark:border-green-700 shadow-lg rounded-xl p-6 w-full sm:w-96 transition-all">
          <p className="text-lg mb-6 text-green-800 dark:text-green-800 transition-colors duration-300">
            {joke.setup} — {joke.punchline}
          </p>

          <button
            onClick={fetchJoke}
            className="
              px-6 py-2 rounded-lg font-medium transition-colors 
              bg-orange-600 text-white hover:bg-orange-700
              dark:bg-orange-500 dark:hover:bg-orange-600
            "
          >
            Get Another Joke
          </button>
        </div>

        {error && (
          <p className="mt-4 text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </Layout>
  );
}

export default JokeApp;
