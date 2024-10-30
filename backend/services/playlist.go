package services

import (
	"api/db"
	"api/models/domains"
	"api/models/dtos"
	"time"
)

func CreatePlaylist(userId int, data *dtos.CreatePlaylistDto) (*dtos.PlaylistDto, *dtos.ErrorDto) {
	playlist := &domains.Playlist{
		Name:        data.Name,
		Description: data.Description,
		UserID:      userId,
		CreatedAt:   time.Now().Format(time.RFC3339),
	}

	if err := db.GetInstance().Create(playlist).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	return &dtos.PlaylistDto{
		ID:          playlist.ID,
		Name:        playlist.Name,
		UserID:      playlist.UserID,
		Description: playlist.Description,
		Songs:       []dtos.SongDto{},
		CreatedAt:   playlist.CreatedAt,
	}, nil
}

func GetUserPlaylists(userId int) ([]*dtos.PlaylistDto, *dtos.ErrorDto) {
	var playlists []*domains.Playlist
	if err := db.GetInstance().
		Preload("Songs").
		Preload("Songs.Artist").
		Where("user_id = ?", userId).
		Find(&playlists).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	var playlistDtos []*dtos.PlaylistDto
	for _, playlist := range playlists {
		var songDtos []dtos.SongDto
		for _, song := range playlist.Songs {
			songDtos = append(songDtos, dtos.SongDto{
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

		playlistDtos = append(playlistDtos, &dtos.PlaylistDto{
			ID:          playlist.ID,
			Name:        playlist.Name,
			UserID:      playlist.UserID,
			Description: playlist.Description,
			Songs:       songDtos,
			CreatedAt:   playlist.CreatedAt,
		})
	}

	return playlistDtos, nil
}

func AddSongToPlaylist(userId int, playlistId int, songId int) *dtos.ErrorDto {
	playlist := &domains.Playlist{}
	if err := db.GetInstance().First(playlist, playlistId).Error; err != nil {
		return &dtos.ErrorDto{Message: "playlist not found"}
	}

	if playlist.UserID != userId {
		return &dtos.ErrorDto{Message: "unauthorized"}
	}

	song := &domains.Song{}
	if err := db.GetInstance().First(song, songId).Error; err != nil {
		return &dtos.ErrorDto{Message: "song not found"}
	}

	if err := db.GetInstance().Model(playlist).Association("Songs").Append(song); err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}

func RemoveSongFromPlaylist(userId int, playlistId int, songId int) *dtos.ErrorDto {
	playlist := &domains.Playlist{}
	if err := db.GetInstance().First(playlist, playlistId).Error; err != nil {
		return &dtos.ErrorDto{Message: "playlist not found"}
	}

	if playlist.UserID != userId {
		return &dtos.ErrorDto{Message: "unauthorized"}
	}

	if err := db.GetInstance().Model(playlist).Association("Songs").Delete(&domains.Song{ID: songId}); err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}

func AddToFavorites(userId int, songId int) *dtos.ErrorDto {
	favorite := &domains.Favorite{
		UserID: userId,
		SongID: songId,
	}

	if err := db.GetInstance().Create(favorite).Error; err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}

func RemoveFromFavorites(userId int, songId int) *dtos.ErrorDto {
	if err := db.GetInstance().
		Where("user_id = ? AND song_id = ?", userId, songId).
		Delete(&domains.Favorite{}).Error; err != nil {
		return &dtos.ErrorDto{Message: err.Error()}
	}

	return nil
}

func GetUserFavorites(userId int) ([]*dtos.SongDto, *dtos.ErrorDto) {
	var favorites []*domains.Favorite
	if err := db.GetInstance().
		Preload("Song").
		Preload("Song.Artist").
		Where("user_id = ?", userId).
		Find(&favorites).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}


	if len(favorites) == 0 {
		return []*dtos.SongDto{}, nil
	}

	var songDtos []*dtos.SongDto
	for _, favorite := range favorites {
		songDtos = append(songDtos, &dtos.SongDto{
			ID:           favorite.Song.ID,
			Title:        favorite.Song.Title,
			ArtistID:     favorite.Song.ArtistID,
			ArtistName:   favorite.Song.Artist.Name,
			FileURL:      favorite.Song.FileURL,
			ThumbnailURL: favorite.Song.ThumbnailURL,
			UploadedAt:   favorite.Song.UploadedAt,
			IsPublished:  favorite.Song.IsPublished,
		})
	}

	return songDtos, nil
}
