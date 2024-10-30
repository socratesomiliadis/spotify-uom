package services

import (
	"api/db"
	"api/models/domains"
	"api/models/dtos"
	"time"
)

func GetAllSongs() ([]*dtos.SongDto, *dtos.ErrorDto) {
	var songs []*domains.Song
	if err := db.GetInstance().
		Preload("Artist").
		Where("is_published = ?", true).
		Find(&songs).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	var songDtos []*dtos.SongDto
	for _, song := range songs {
		songDtos = append(songDtos, &dtos.SongDto{
			ID:           song.ID,
			Title:        song.Title,
			ArtistID:     song.ArtistID,
			ArtistName:   song.Artist.Name,
			FileURL:      song.FileURL,
			ThumbnailURL: song.ThumbnailURL,
			UploadedAt:   song.UploadedAt,
			IsPublished:  song.IsPublished,
		})
	}

	return songDtos, nil
}

func GetSongByID(songId int) (*dtos.SongDto, *dtos.ErrorDto) {
	song := &domains.Song{}

	if err := db.GetInstance().Preload("Artist").First(song, songId).Error; err != nil {

		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	songDto := &dtos.SongDto{
		ID:           song.ID,
		Title:        song.Title,
		ArtistID:     song.ArtistID,
		ArtistName:   song.Artist.Name,
		FileURL:      song.FileURL,
		ThumbnailURL: song.ThumbnailURL,
		UploadedAt:   song.UploadedAt,
		IsPublished:  song.IsPublished,
	}

	return songDto, nil
}

func GetSongsByTitle(title string) ([]*dtos.SongDto, *dtos.ErrorDto) {
	var songs []*domains.Song
	if err := db.GetInstance().
		Preload("Artist").
		Where("title LIKE ?", "%"+title+"%").
		Find(&songs).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	var songDtos []*dtos.SongDto
	for _, song := range songs {
		songDtos = append(songDtos, &dtos.SongDto{
			ID:           song.ID,
			Title:        song.Title,
			ArtistID:     song.ArtistID,
			ArtistName:   song.Artist.Name,
			FileURL:      song.FileURL,
			ThumbnailURL: song.ThumbnailURL,
			UploadedAt:   song.UploadedAt,
			IsPublished:  song.IsPublished,
		})
	}

	return songDtos, nil
}

func GetArtistSongs(artistId int) ([]*dtos.SongDto, *dtos.ErrorDto) {
	var songs []*domains.Song
	if err := db.GetInstance().
		Preload("Artist").
		Where("artist_id = ?", artistId).
		Find(&songs).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	var songDtos []*dtos.SongDto
	for _, song := range songs {
		songDtos = append(songDtos, &dtos.SongDto{
			ID:           song.ID,
			Title:        song.Title,
			ArtistID:     song.ArtistID,
			ArtistName:   song.Artist.Name,
			FileURL:      song.FileURL,
			ThumbnailURL: song.ThumbnailURL,
			UploadedAt:   song.UploadedAt,
			IsPublished:  song.IsPublished,
		})
	}

	return songDtos, nil
}

func CreateSong(userId int, songData *dtos.UploadSongDto) *dtos.ErrorDto {
	// Verify user is an artist
	user := &domains.User{}
	if err := db.GetInstance().First(user, userId).Error; err != nil {
		return &dtos.ErrorDto{Message: "user not found"}
	}

	if !user.IsArtist {
		return &dtos.ErrorDto{Message: "only artists can upload songs"}
	}

	song := &domains.Song{
		Title:        songData.Title,
		ArtistID:     userId,
		FileURL:      songData.FileURL,
		ThumbnailURL: songData.ThumbnailURL,
		IsPublished:  songData.IsPublished,
		UploadedAt:   time.Now().Format(time.RFC3339),
	}

	if err := db.GetInstance().Create(song).Error; err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}

func DeleteSong(userId int, songId int) *dtos.ErrorDto {
	// Verify song exists and user owns it
	song := &domains.Song{}
	if err := db.GetInstance().First(song, songId).Error; err != nil {
		return &dtos.ErrorDto{Message: "song not found"}
	}

	if song.ArtistID != userId {
		return &dtos.ErrorDto{Message: "unauthorized"}
	}

	// Delete song
	if err := db.GetInstance().Delete(song).Error; err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}
