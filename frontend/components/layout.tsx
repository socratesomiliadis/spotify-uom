import SongBar from "./song-bar";
import SpotifyWrapper from "./spotify-wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SongBar />
      <SpotifyWrapper>{children}</SpotifyWrapper>
    </main>
  );
}
