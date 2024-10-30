package dtos

type PlaylistDto struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	UserID      int       `json:"userId"`
	Description string    `json:"description"`
	Songs       []SongDto `json:"songs"`
	CreatedAt   string    `json:"createdAt"`
}

type CreatePlaylistDto struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type AddSongToPlaylistDto struct {
	SongID int `json:"songId"`
} 