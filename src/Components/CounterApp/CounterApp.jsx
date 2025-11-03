import React, { useContext, useState } from "react";
import Layout from "../Layout/Layout";
import { themeContext } from "../../App";
import CounterButton from "./CounterButton";

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  return (
    <Layout>
      <div
        className={`flex flex-col items-center justify-center min-h-[94vh] 
      ${isDark ? "bg-gray-900" : "bg-bgColor"}`}
      >
        <div className="border border-yellow-300 dark:border-yellow-700 shadow-lg rounded-2xl p-8 text-center w-80">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">Counter App</h1>

          <p className="text-5xl font-extrabold mb-8 text-red-800">{count}</p>

          <div className="flex gap-4 justify-center">
            <CounterButton onClick={() => count > 0 && setCount(count - 1)} text="-" disabled={count === 0} />
            <CounterButton onClick={() => count < 10 && setCount(count + 1)} text="+" />
            <CounterButton onClick={() => setCount(0)} text="Reset" />
          </div>
        </div>
      </div>
    </Layout>
  );  
};

export default CounterApp;
