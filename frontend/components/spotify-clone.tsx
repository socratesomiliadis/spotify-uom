"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Library,
  Moon,
  Pause,
  Play,
  Plus,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Sun,
  Volume2,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SpotifyClone() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <SidebarProvider>
      <div className="h-screen bg-background text-foreground flex flex-col">
        <div className="w-screen flex flex-1 overflow-hidden">
          {/* Desktop Sidebar */}
          <Sidebar collapsible="icon" className="hidden md:flex">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Home</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Search</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center">
                    <Library className="mr-2 h-4 w-4" />
                    <span>Your Library</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4" />
                  </Button>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <ScrollArea className="h-[calc(100vh-280px)]">
                    <SidebarMenu>
                      {Array.from({ length: 50 }).map((_, i) => (
                        <SidebarMenuItem key={i}>
                          <SidebarMenuButton asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start font-normal"
                            >
                              <span>Playlist {i + 1}</span>
                            </Button>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </ScrollArea>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start px-2">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>shadcn</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56" align="start" side="right">
                  <div className="grid gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">shadcn</p>
                        <p className="text-xs text-muted-foreground">
                          m@example.com
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Separator />
                      <Button variant="ghost" className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </SidebarFooter>
            <SidebarRail />
          </Sidebar>
          <SidebarInset className="flex-1">
            <main className="flex-1 overflow-hidden">
              <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1 hidden md:flex" />
                    {/* Mobile menu trigger */}
                    <Sheet
                      open={isMobileMenuOpen}
                      onOpenChange={setIsMobileMenuOpen}
                    >
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="md:hidden"
                        >
                          <Menu className="h-5 w-5" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </SheetTrigger>
                      <SheetContent
                        side="left"
                        className="w-[300px] sm:w-[400px]"
                      >
                        <nav className="flex flex-col h-full">
                          <div className="py-4">
                            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                              Menu
                            </h2>
                            <div className="space-y-1">
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Home className="mr-2 h-4 w-4" />
                                Home
                              </Button>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                              >
                                <Search className="mr-2 h-4 w-4" />
                                Search
                              </Button>
                            </div>
                          </div>
                          <div className="py-4">
                            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                              Your Library
                            </h2>
                            <ScrollArea className="h-[300px] px-1">
                              <div className="space-y-1">
                                {Array.from({ length: 50 }).map((_, i) => (
                                  <Button
                                    key={i}
                                    variant="ghost"
                                    className="w-full justify-start"
                                  >
                                    Playlist {i + 1}
                                  </Button>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </nav>
                      </SheetContent>
                    </Sheet>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="h-8 w-8"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <h1 className="text-3xl font-bold">Good afternoon</h1>
              </div>
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-4 flex items-center space-x-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-md" />
                          <div>Playlist {i + 1}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <h2 className="text-2xl font-semibold">Made for You</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Card key={i}>
                        <CardContent className="p-4">
                          <div className="w-full aspect-square bg-primary/10 rounded-md mb-4" />
                          <div className="font-semibold">Daily Mix {i + 1}</div>
                          <div className="text-sm text-muted-foreground">
                            Playlist
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </main>
          </SidebarInset>
        </div>
        <footer className="h-20 bg-card text-card-foreground border-t">
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
        </footer>
      </div>
    </SidebarProvider>
  );
}
