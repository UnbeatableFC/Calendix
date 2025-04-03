"use client";
import Link from "next/link";
import React from "react";

const Rightnav = ({ email }: { email: string }) => {
  const hasLoggedOut =
    window && window.location.href.includes("logged-out");

  if (email && !hasLoggedOut) {
    return (
      <nav className="flex gap-3 items-center">
        <Link
          href={"/dashboard"}
          className="bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Dashboard
        </Link>

        <a href={"/api/logout"}>Logout</a>
      </nav>
    );
  } else {
    return (
      <nav className="flex gap-4 items-center">
        <Link href={"/api/auth"}>Sign In</Link>
        <Link
          href={"/sign-up"}
          className="bg-blue-600 text-white py-2 px-4 rounded-full"
        >
          Get Started
        </Link>
      </nav>
    );
  }
};

export default Rightnav;
