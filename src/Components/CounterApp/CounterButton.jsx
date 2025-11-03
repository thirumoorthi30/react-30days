import React from "react";

const CounterButton = ({ onClick, text, disabled }) => {
  console.log("Button rendered = ", text);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400"
    >
      {text}
    </button>
  );
};

export default React.memo(CounterButton);
