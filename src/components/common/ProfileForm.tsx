"use client";
import axios from "axios";
import { FormEvent, useState } from "react";

const ProfileForm = () => {
  const [username, setUsername] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSaved(false);
    setIsError(false);
    const res = await axios.put("/api/profile", { username });
    if (res.data) {
      setIsSaved(true);
    } else {
      setIsError(true);
    }
  }
  return (
    <div>
      <form className="max-w-xs mx-auto mt-8" onSubmit={handleSubmit}>
        {isSaved && <p>Username Saved!</p>}
        {isError && (
          <p className="text-red-500">Something went wrong</p>
        )}
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

export default ProfileForm;
