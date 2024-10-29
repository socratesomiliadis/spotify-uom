import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2.5 flex items-center space-x-4">
              <div className="size-16 bg-primary/10 rounded-md" />
              <div>Playlist {i + 1}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold">Made for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2.5">
              <div className="w-full aspect-square bg-primary/10 rounded-md mb-4" />
              <div className="font-semibold">Daily Mix {i + 1}</div>
              <div className="text-sm text-muted-foreground">Playlist</div>
            </CardContent>
          </Card>
        ))}
      </div>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2.5">
              <div className="w-full aspect-square bg-primary/10 rounded-md mb-4" />
              <div className="font-semibold">Daily Mix {i + 1}</div>
              <div className="text-sm text-muted-foreground">Playlist</div>
            </CardContent>
          </Card>
        ))}
      </div>{" "}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-2.5">
              <div className="w-full aspect-square bg-primary/10 rounded-md mb-4" />
              <div className="font-semibold">Daily Mix {i + 1}</div>
              <div className="text-sm text-muted-foreground">Playlist</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
