"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { songService } from "@/libs/services/songService";
import useUploadModal from "@/hooks/useUploadModal";
import { useSession } from "next-auth/react";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { data: session } = useSession();
  const router = useRouter();

  const { register, handleSubmit, reset, setValue } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!songFile || !imageFile) {
        toast.error("Missing fields");
        return;
      }

      // Create song with uploaded URLs
      const song = await songService.uploadSong({
        title: values.title,
        author: values.author,
        songUrl: values.song,
        imageUrl: values.image,
      });

      router.refresh();
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={uploadModal.onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <UploadButton
            endpoint="songUploader"
            onClientUploadComplete={(res: any) => {
              if (res?.[0]?.url) {
                setValue("song", res[0].url);
                toast.success("Song uploaded!");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              if (res?.[0]?.url) {
                setValue("image", res[0].url);
                toast.success("Image uploaded!");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
