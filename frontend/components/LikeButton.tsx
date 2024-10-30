"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "@/lib/services/song";

interface LikeButtonProps {
  songId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    if (!session?.user) {
      return;
    }

    const fetchData = async () => {
      try {
        const likedSongs = await getFavorites(
          session?.user?.accessToken as string
        );
        setIsLiked(likedSongs.some((song) => song.id === songId));
      } catch (error) {
        toast.error("Failed to load liked status");
      }
    };

    fetchData();
  }, [songId, session?.user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!session?.user) {
      return router.push("/auth/login");
    }

    try {
      if (isLiked) {
        await removeFromFavorites(session?.user?.accessToken as string, songId);
        setIsLiked(false);
      } else {
        await addToFavorites(session?.user?.accessToken as string, songId);
        setIsLiked(true);
        toast.success("Liked!");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button className="hover:opacity-75 transition" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
