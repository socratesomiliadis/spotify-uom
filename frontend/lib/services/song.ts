import { SongDto } from "@/lib/dtos/song";
import { ErrorDto } from "@/lib/dtos/error";
import axios from "axios";

const API_URL =
  typeof window === "undefined"
    ? process.env.BACKEND_API_HOST
    : "http://fwk4g0wsg8sgg0gosco8sggo.167.235.203.74.sslip.io";

const throwAxiosError = (err: any) => {
  if (!!err.response) {
    if (!!err.response.data && !!err.response.data["message"]) {
      throw new Error(err.response.data["message"]);
    }
    throw new Error(err.message);
  }
  throw new Error("failed to perform request");
};

export async function getAllSongs(): Promise<SongDto[]> {
  const response = await fetch(`${API_URL}/songs/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    console.log(error);
    throw new Error(error.message);
  }

  return response.json();
}

export async function getSongById(id: number): Promise<SongDto> {
  const response = await fetch(`${API_URL}/songs/get/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    console.log(error);
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
  try {
    const res = await fetch(`${API_URL}/songs/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        isPublished: data.isPublished,
        fileURL: data.fileURL,
        thumbnailURL: data.thumbnailURL,
      }),
    });

    console.log(res);
    console.log(token, data);

    return res.json();
  } catch (err: any) {
    throwAxiosError(err);
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
  if (!token) return [];
  const response = await fetch(`${API_URL}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = (await response.json()) as ErrorDto;
    throw new Error(error.message);
  }

  return response.json();
}
