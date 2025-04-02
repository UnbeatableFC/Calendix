"use server";
import { session } from "@/libs/session";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import Rightnav from "./Rightnav";

const Header = async () => {
  const email = await session().get("email");

  return (
    <header className="flex gap-4 justify-between items-center px-4 py-6 text-gray-600 font-light">
      <div className="flex items-center justify-center gap-10">
        <Link
          href={"/"}
          className=" flex items-center gap-1 text-blue-600 font-bold text-2xl"
        >
          <span>
            <CalendarDays size={28} />
          </span>
          Calendix
        </Link>
        <nav className="flex gap-4">
          <Link href={"/features"}>Features</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/pricing"}>Pricing</Link>
        </nav>
      </div>

      <Rightnav email={email} />
    </header>
  );
};

export default Header;
