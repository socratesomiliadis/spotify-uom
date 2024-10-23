"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Apple, Facebook } from "lucide-react";

export function SpotifyLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
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
          <Button
            variant="outline"
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            <Apple className="mr-2 h-4 w-4" />
            Continue with Apple
          </Button>
          <Button
            variant="outline"
            className="w-full bg-[#1877F2] text-white hover:bg-[#0e5a9c]"
          >
            <Facebook className="mr-2 h-4 w-4" />
            Continue with Facebook
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">or</span>
            </div>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-200"
              >
                Email address or username
              </Label>
              <Input
                id="email"
                placeholder="Email address or username"
                required
                className="bg-[#121212] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="bg-[#121212] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" className="border-gray-500" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium text-gray-200"
              >
                Remember me
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#1DB954] text-black hover:bg-[#1ed760]"
            >
              Log In
            </Button>
          </form>
          <div className="text-center">
            <a href="#" className="text-[#1DB954] hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-400">Don&apos;t have an account?</p>
          <a href="#" className="text-white hover:underline">
            Sign up for Spotify
          </a>
        </div>
      </div>
    </div>
  );
}
