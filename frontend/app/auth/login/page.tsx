"use client";

import { useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/forms/login-form";
import Link from "next/link";

export default function Login() {
  const callbackUrl = useSearchParams().get("callbackUrl") || "/";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black dark:text-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12a4 4 0 0 1 8 0" />
            <path d="M9 12a3 3 0 0 1 6 0" />
            <path d="M10 12a2 2 0 0 1 4 0" />
          </svg>
          <h1 className="text-3xl font-bold">Log in to Spotify</h1>
        </div>
        <div className="space-y-4">
          <LoginForm callbackUrl={callbackUrl} />
          <div className="text-center">
            <a href="#" className="text-[#1DB954] hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">Don&apos;t have an account?</p>
          <Link href="/auth/register" className="hover:underline">
            Register for Spotify
          </Link>
        </div>
      </div>
    </div>
  );
}
