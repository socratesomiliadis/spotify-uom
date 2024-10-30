import { Song } from "@/types";

const useLoadImage = (song: Song) => {
  if (!song) {
    return null;
  }
  return song.imageUrl;
};

export default useLoadImage;
