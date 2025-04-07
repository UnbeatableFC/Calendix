"use client";
import DashboardNav from "@/components/common/DashboardNav";
import axios from "axios";
import { FormEvent, useState } from "react";

const DashboardPage = () => {
  const [username, setUsername] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await axios.put("/api/profile", username);
    setIsSaved(true);
  }
  return (
    <div>
      <DashboardNav />
      <form className="max-w-xs mx-auto mt-8" onSubmit={handleSubmit}>
        {isSaved && <p>Username Saved!</p>}
        <label htmlFor="">
          <span>Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="text-center mt-4">
            <button type="submit" className="btn-blue !px-8">
              Save
            </button>
          </div>
        </label>
      </form>
    </div>
  );
};

export default DashboardPage;
