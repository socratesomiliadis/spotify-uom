"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { SongDto } from "@/lib/dtos/song";
import useUploadModal from "@/hooks/useUploadModal";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";
import { useRouter } from "next/navigation";

interface LibraryProps {
  songs: SongDto[];
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const uploadModal = useUploadModal();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!session?.user) {
      router.push("/auth/login");
    }

    router.push("/upload");
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs?.map((item) => (
          <MediaItem
            onClick={(id: number) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
