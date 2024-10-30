import { SongDto } from "@/lib/dtos/song";
import { useSession } from "next-auth/react";

import usePlayer from "./usePlayer";
import { useRouter } from "next/navigation";

const useOnPlay = (songs: SongDto[]) => {
  const player = usePlayer();
  const { data: session } = useSession();
  const router = useRouter();

  const onPlay = (id: number) => {
    if (!session?.user) {
      return router.push("/auth/login");
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
