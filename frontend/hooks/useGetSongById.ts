import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { SongDto } from "@/lib/dtos/song";
import { getSongById } from "@/lib/services/song";

const useSongById = (id?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<SongDto | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      try {
        const data = await getSongById(id);
        setSong(data);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [id]);

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  );
};

export default useSongById;
