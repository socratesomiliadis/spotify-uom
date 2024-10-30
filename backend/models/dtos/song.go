package dtos

type SongDto struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	ArtistID     int    `json:"artistId"`
	ArtistName   string `json:"artistName"`
	FileURL      string `json:"fileURL"`
	ThumbnailURL string `json:"thumbnailURL"`
	UploadedAt   string `json:"uploadedAt"`
	IsPublished  bool   `json:"isPublished"`
}

type UploadSongDto struct {
	Title        string `json:"title"`
	IsPublished  bool   `json:"isPublished"`
	FileURL      string `json:"fileURL"`
	ThumbnailURL string `json:"thumbnailURL"`
}
