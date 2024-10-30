"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { capitalize } from "@/lib/utils";

export function LoginForm({ callbackUrl }: { callbackUrl: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleCredentialLogin = async (data: any) => {
    const res = await signIn("credentials-signin", {
      ...data,
      callbackUrl,
      redirect: false,
    });

    if (res) {
      if (res.ok) {
        router.push(res.url!);
      } else {
        toast.error(capitalize(res.error!)!);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCredentialLogin({
          email,
          password,
        });
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email address
        </Label>
        <Input
          id="email"
          placeholder="Email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#121212] border-gray-700 rounded-full text-white placeholder-gray-400"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#121212] rounded-full border-gray-700 text-white placeholder-gray-400"
        />
      </div>
      {/* <div className="flex items-center space-x-2">
        <Checkbox id="remember" className="border-gray-500" />
        <Label htmlFor="remember" className="text-sm font-medium text-gray-200">
          Remember me
        </Label>
      </div> */}
      <Button
        type="submit"
        className="w-full mt-2 rounded-full bg-[#1DB954] text-black hover:bg-[#1ed760]"
      >
        Log In
      </Button>
    </form>
  );
}
