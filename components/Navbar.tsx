import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  // console.log({session})
  return (
    <header className="px-5 py-3 bg-white shandow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/feather.png" alt="logo" width={30} height={10} />
          <p className="font-black text-secondary text-lg italic">
            <span className="text-primary-100">Re</span>Write
          </p>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link
                className="cursor-pointer flex gap-2 items-center hover:border hover:border-primary rounded-md px-2 py-1"
                href="/opportunity/create"
              >
                <BadgePlus className="size-6 " />
                <span className="max-sm:hidden text-xs">Opportunity</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                className="cursor-pointer flex gap-2 items-center hover:border hover:border-primary rounded-md px-2 py-1"
              >
                <LogOut className="size-6 text-red-500" />
                <span className="max-w-sm:hidden text-xs">Logout</span>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
