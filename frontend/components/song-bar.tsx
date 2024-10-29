import { Slider } from "@radix-ui/react-slider";
import {
  Shuffle,
  SkipBack,
  Play,
  SkipForward,
  Repeat,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SongBar() {
  return (
    <div className="fixed w-screen left-0 bottom-0 z-[100] h-20 bg-card text-card-foreground border-t">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-primary/10 rounded-md hidden sm:block" />
          <div>
            <div className="font-semibold">Song Title</div>
            <div className="text-sm text-muted-foreground">Artist</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 sm:space-x-4 mb-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden sm:flex"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hidden sm:flex"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <Slider
            defaultValue={[33]}
            max={100}
            step={1}
            className="w-[200px] sm:w-[300px] md:w-[400px]"
          />
        </div>
        <div className="items-center space-x-2 hidden md:flex">
          <Volume2 className="h-4 w-4" />
          <Slider
            defaultValue={[66]}
            max={100}
            step={1}
            className="w-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
