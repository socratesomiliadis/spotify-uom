"use client";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";

//Page with basic account information
export default function Account() {
  const { data: session } = useSession();
  return (
    <div
      className="
      bg-neutral-900 
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto
      rounded-xl
    "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
          text-white 
            text-3xl 
            font-semibold
          "
          >
            Welcome back {session?.user?.name}
          </h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Name</h1>
        </div>
      </div>
    </div>
  );
}
