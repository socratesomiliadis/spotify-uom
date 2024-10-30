"use client";

import { UploadForm } from "@/components/forms/upload-form";

export default function Upload() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto mb-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12a4 4 0 0 1 8 0" />
            <path d="M9 12a3 3 0 0 1 6 0" />
            <path d="M10 12a2 2 0 0 1 4 0" />
          </svg>
          <h1 className="text-3xl font-bold">Upload to Spotify</h1>
        </div>
        <div className="space-y-4">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}
