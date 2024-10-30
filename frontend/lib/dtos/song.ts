export interface SongDto {
  id: number;
  title: string;
  artistId: number;
  artistName: string;
  fileURL: string;
  thumbnailURL: string;
  uploadedAt: string;
  isPublished: boolean;
}
