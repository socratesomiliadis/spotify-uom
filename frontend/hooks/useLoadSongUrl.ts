import { SongDto } from "@/lib/dtos/song";

const useLoadSongUrl = (song: SongDto) => {
  if (!song) {
    return "";
  }
  return song.fileURL;
};

export default useLoadSongUrl;
