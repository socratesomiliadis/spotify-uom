"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegisterForm({ callbackUrl }: { callbackUrl: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const handleCredentialSignup = async (data: any) => {
    const isArtist = data.isArtist === "true";
    const res = await signIn("credentials-signup", {
      name: data.name,
      email: data.email,
      password: data.password,
      isArtist: true,
      callbackUrl,
      redirect: false,
    });

    if (res) {
      if (res.ok) {
        router.push(res.url!);
      } else {
        console.log(res.error);
      }
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleCredentialSignup)}
      className="space-y-4"
    >
      <div className="flex flex-row justify-between">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-gray-200">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
            })}
            className="bg-[#121212] border-gray-700 text-white placeholder-gray-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message?.toString()}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-200">
            Email address
          </Label>
          <Input
            id="email"
            placeholder="Email address"
            {...register("email", {
              pattern: {
                value: /[^@]+@[^@]+\.[^@]+/,
                message: "Invalid email address",
              },
              required: "Email is required",
            })}
            className="bg-[#121212] border-gray-700 text-white placeholder-gray-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-200">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="bg-[#121212] border-gray-700 text-white placeholder-gray-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">
            {errors.password.message?.toString()}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="isArtist"
          {...register("isArtist")}
          className="border-gray-500"
        />
        <Label htmlFor="isArtist" className="text-sm font-medium text-gray-200">
          Are you an artist?
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full mt-2 bg-[#1DB954] text-black hover:bg-[#1ed760]"
      >
        Register
      </Button>
    </form>
  );
}
