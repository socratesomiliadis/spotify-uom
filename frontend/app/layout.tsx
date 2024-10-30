import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import ToasterProvider from "@/providers/ToasterProvider";

import Player from "@/components/Player";

import "./globals.css";
import { getAllSongs } from "@/lib/services/song";
import Providers from "./providers";
import { getSession } from "@/lib/auth/options";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Clone",
  description:
    "Spotify clone created using Next.js 13, Tailwind CSS and TypeScript.",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getAllSongs();
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ToasterProvider />

        <Providers session={session}>
          <Sidebar songs={songs}>{children}</Sidebar>
          <Player />
        </Providers>
      </body>
    </html>
  );
}
