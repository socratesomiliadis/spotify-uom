import { SongDto } from "@/lib/dtos/song";
import { ErrorDto } from "@/lib/dtos/error";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllSongs(): Promise<SongDto[]> {
  const response = await fetch(`${API_URL}/songs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}

export async function getSongById(id: number): Promise<SongDto> {
  const response = await fetch(`${API_URL}/songs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}

export async function getSongsByTitle(title: string): Promise<SongDto[]> {
  const response = await fetch(`${API_URL}/songs/title/${title}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}

export async function getArtistSongs(token: string): Promise<SongDto[]> {
  const response = await fetch(`${API_URL}/artist/songs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}

export async function createSong(
  token: string,
  data: {
    title: string;
    isPublished: boolean;
    fileURL: string;
    thumbnailURL: string;
  }
): Promise<void> {
  const response = await fetch(`${API_URL}/songs/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }
}

export async function deleteSong(token: string, songId: number): Promise<void> {
  const response = await fetch(`${API_URL}/songs/delete/${songId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }
}

export async function addToFavorites(
  token: string,
  songId: number
): Promise<void> {
  const response = await fetch(`${API_URL}/favorites/add/${songId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }
}

export async function removeFromFavorites(
  token: string,
  songId: number
): Promise<void> {
  const response = await fetch(`${API_URL}/favorites/remove/${songId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }
}

export async function getFavorites(token: string): Promise<SongDto[]> {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}
