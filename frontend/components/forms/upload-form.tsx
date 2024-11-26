"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { createSong } from "@/lib/services/song";
import toast from "react-hot-toast";

export function UploadForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!session?.user?.accessToken) {
      router.push("/auth/login");
      return;
    }

    if (!fileURL || !imageURL) {
      toast.error("Please upload a file and image");
      return;
    }

    try {
      const res = await createSong(session.user.accessToken, {
        title,
        fileURL,
        isPublished: true,
        thumbnailURL: imageURL,
      });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleUpload();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title
        </Label>
        <Input
          id="title"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
          className="bg-[#121212] border-gray-700 rounded-full text-white placeholder-gray-400"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Song Thumbnail</Label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(data) => {
            setImageURL(data[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Song File</Label>
        <UploadButton
          endpoint="songUploader"
          onClientUploadComplete={(data) => {
            setFileURL(data[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
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
        Upload
      </Button>
    </form>
  );
}
