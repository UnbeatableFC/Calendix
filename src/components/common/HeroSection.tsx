"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [showline, setShowline] = useState(false);
  

  useEffect(() => {
    setShowline(true);
  }, []);

  return (
    <div>
      <section className="text-center mt-24">
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Scheduling{" "}
          <span
            className={
              "text-blue-600 cool-underline " +
              (showline ? "showline" : " ")
            }
          >
            {" "}
            made simpler!
          </span>
          <br />
          Just for you
        </h1>
        <p className="text-gray-600">
          Calendix simplifies scheduling—intuitive, powerful, and
          hassle-free.
          <br />
          It’s designed to save you time, keep you organized, and make
          managing your appointments effortless and stress-free every
          single day.
        </p>

        <div className="mt-6 flex gap-4 justify-center">
          <Link
            href={"/"}
            className="bg-black  text-white py-2 px-4 rounded-full"
          >
            Get started for free
          </Link>
          <Link
            href={"/"}
            className="border border-gray-300 text-gray-800 inline-flex gap-1 items-center rounded-full py-2 px-4"
          >
            Watch Video{" "}
            <span>
              <Play size={16} className="" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
