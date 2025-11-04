import React, { useState, useContext } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Layout from "../Pages/Layout";
import { themeContext } from "../../App";

const TodoList = () => {
   const { theme } = useContext(themeContext);
  const isDark = theme === "dark";

  const [items, setItems] = useState([
    { id: 1, title: "Learn HTML", checked: true, isEditing: false, plannedFor: "Today" },
    { id: 2, title: "Learn CSS", checked: false, isEditing: false, plannedFor: "Today" },
    { id: 3, title: "Learn JS", checked: false, isEditing: false, plannedFor: "Tomorrow" },
    { id: 4, title: "Learn React", checked: false, isEditing: false, plannedFor: "Next Week" },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [plannedFor, setPlannedFor] = useState("Today");
  const [showPopup, setShowPopup] = useState(false);

  const handleChecked = (id) =>
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));

  const handleDelete = (id) => setItems(items.filter((item) => item.id !== id));

  const handleEditClick = (id) =>
    setItems(items.map((item) => (item.id === id ? { ...item, isEditing: true } : item)));

  const handleInEdit = (e, id) =>
    setItems(items.map((item) => (item.id === id ? { ...item, title: e.target.value } : item)));

  const handleEditSave = (id) =>
    setItems(items.map((item) => (item.id === id ? { ...item, isEditing: false } : item)));

  const handleAddSave = () => {
    if (!newTodo.trim()) return;
    setItems([...items, { id: Date.now(), title: newTodo, checked: false, isEditing: false, plannedFor }]);
    setNewTodo("");
    setPlannedFor("Today");
    setShowPopup(false);
  };

  const inProgress = items.filter((i) => !i.checked && i.plannedFor === "Today");
  const future = items.filter((i) => !i.checked && i.plannedFor !== "Today");
  const completed = items.filter((i) => i.checked);

  const renderList = (list, title) => (
    <div
      className={`flex-1 rounded-lg shadow-md p-4 mx-2 min-h-[60vh]
      ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>

      {list.length === 0 ? (
        <p className="text-gray-400 italic text-center">No todos here</p>
      ) : (
        list.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center p-3 mb-3 rounded-lg shadow-sm border transition 
            ${isDark ? "bg-gray-700 hover:bg-gray-600 border-gray-600" : "bg-gray-50 hover:bg-gray-100 border-gray-300"}`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChecked(item.id)}
                className="w-5 h-5"
              />

              {item.isEditing ? (
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleInEdit(e, item.id)}
                  onKeyDown={(e) => e.key === "Enter" && handleEditSave(item.id)}
                  className={`border-b focus:outline-none text-lg
                  ${isDark ? "bg-gray-700 text-white border-gray-500" : "bg-white text-gray-900 border-gray-400"}`}
                  autoFocus
                />
              ) : (
                <span className={`text-lg ${item.checked ? "line-through text-gray-400" : ""}`}>
                  {item.title}
                </span>
              )}
            </div>

            <div className="flex gap-4 text-lg">
              {item.isEditing ? (
                <button className="text-green-500 font-semibold" onClick={() => handleEditSave(item.id)}>
                  Save
                </button>
              ) : (
                !item.checked && (
                  <FaEdit className="text-green-500 cursor-pointer" onClick={() => handleEditClick(item.id)} />
                )
              )}
              <FaTrashAlt className="text-red-500 cursor-pointer" onClick={() => handleDelete(item.id)} />
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <Layout>
      <div
        className={`min-h-[84.5vh] flex flex-col items-center p-10 w-full
        ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
      >
        <h2 className="text-3xl font-bold mb-8">Todo List</h2>

        <div className="flex justify-around w-full">
          {renderList(inProgress, "In Progress")}
          {renderList(future, "Future")}
          {renderList(completed, "Completed")}
        </div>

        {/* Add Button */}
        <button
          className={`fixed bottom-8 right-8 w-14 h-14 rounded-full 
          ${isDark ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-blue-600 text-white hover:bg-blue-700"}
          text-3xl shadow-lg font-bold`}
          onClick={() => setShowPopup(true)}
        >
          +
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
              className={`p-6 rounded-2xl shadow-lg w-80
              ${isDark ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
            >
              <h3 className="text-xl font-semibold mb-4">Add New Todo</h3>

              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 mb-4 focus:outline-none
                ${isDark ? "bg-gray-700 border border-gray-600 text-white" : "bg-white border border-gray-300"}`}
                placeholder="Enter todo..."
                autoFocus
              />

              <select
                value={plannedFor}
                onChange={(e) => setPlannedFor(e.target.value)}
                className={`w-full rounded-lg px-3 py-2 mb-4
                ${isDark ? "bg-gray-700 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`}
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Next Week">Next Week</option>
              </select>

              <div className="flex justify-end gap-3">
                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
                <button
                  className={`${isDark ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-blue-600 text-white hover:bg-blue-700"} px-4 py-2 rounded-lg`}
                  onClick={handleAddSave}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TodoList;
