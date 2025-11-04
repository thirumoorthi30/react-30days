import React, { useContext } from "react";
import { themeContext } from "../../App";

export default function Footer() {
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  return (
    <footer
      className={`py-3 text-center border-t ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-gray-100 text-black border-gray-300"
      }`}
    >
      <h3 className="text-sm font-semibold">© 2025 All Rights Reserved</h3>
    </footer>
  );
}
