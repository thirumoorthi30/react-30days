import React, { useContext } from "react";
import ProfileCard from "./ProfileCard";
import Layout from "../Pages/Layout";
import { themeContext } from "../../App";

function ProfileCardPage() {
  const { theme } = useContext(themeContext);
  const isDark = theme === "dark";
  const profiles = [
    {
      name: "Thiru",
      role: "Frontend Developer",
      email: "thiru@example.com",
      phone: "123-456-7890",
    },
    {
      name: "Ram",
      role: "Backend Developer",
      email: "ram@example.com",
      phone: "987-654-3210",
    },
    {
      name: "Ravi",
      role: "UI/UX Designer",
      email: "ravi@example.com",
      phone: "555-234-6789",
    },
    {
      name: "Raju",
      role: "DevOps Engineer",
      email: "raju@example.com",
      phone: "555-987-6543",
    },
  ];

  return (
    <Layout>
      <div
        className={`min-h-[94vh] flex flex-wrap justify-center items-center gap-6 p-10 transition-all ${
          isDark ? "bg-gray-900" : "bg-bgColor"
        }`}
      >
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
      </div>
    </Layout>
  );
}

export default ProfileCardPage;
