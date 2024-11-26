package main

import (
	"api/auth"
	"api/db"
	"api/models/dtos"
	"api/services"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile(".env")
	viper.ReadInConfig()

	db.ConnectDB()
	db.GetInstance().Migration()

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("welcome"))
	})

	router.Post("/signup/credential", func(w http.ResponseWriter, r *http.Request) {
		var signupData dtos.CredentialSignupDto
		parsingErr := json.NewDecoder(r.Body).Decode(&signupData)
		if parsingErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: parsingErr.Error()})
			return
		}

		result, err := services.CredentialSignup(&signupData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(result)
	})

	// router.Post("/signup/oauth", func(w http.ResponseWriter, r *http.Request) {
	// 	var signupData dtos.OAuthDto
	// 	parsingErr := json.NewDecoder(r.Body).Decode(&signupData)
	// 	if parsingErr != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: parsingErr.Error()})
	// 		return
	// 	}

	// 	result, err := services.OAuthSignup(&signupData)
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(err)
	// 		return
	// 	}
	// 	w.WriteHeader(http.StatusOK)
	// 	json.NewEncoder(w).Encode(result)
	// })

	router.Post("/login/credential", func(w http.ResponseWriter, r *http.Request) {
		var signinData dtos.CredentialSigninDto
		parsingErr := json.NewDecoder(r.Body).Decode(&signinData)
		if parsingErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: parsingErr.Error()})
			return
		}

		token, err := services.UserCredentialLogin(&signinData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(token)
	})

	// router.Post("/login/oauth", func(w http.ResponseWriter, r *http.Request) {
	// 	var signinData dtos.OAuthDto
	// 	parsingErr := json.NewDecoder(r.Body).Decode(&signinData)
	// 	if parsingErr != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: parsingErr.Error()})
	// 		return
	// 	}

	// 	token, err := services.UserOAuthLogin(&signinData)
	// 	if err != nil {
	// 		w.WriteHeader(http.StatusBadRequest)
	// 		json.NewEncoder(w).Encode(err)
	// 		return
	// 	}
	// 	w.WriteHeader(http.StatusOK)
	// 	json.NewEncoder(w).Encode(token)
	// })

	router.With(auth.Authenticate).Get("/profile", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		profile, errDto := services.GetUserByID(currentUser.ID)
		if errDto != nil {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(errDto)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(profile)
	})

	router.Post("/email-verify", func(w http.ResponseWriter, r *http.Request) {
		var verificationData dtos.EmailVerifyDto
		parsingErr := json.NewDecoder(r.Body).Decode(&verificationData)
		if parsingErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: parsingErr.Error()})
			return
		}

		user, err := services.VerifyUserEmail(&verificationData)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(user)
	})

	// Add these routes inside the main function after the existing routes

	// Get all published songs
	router.Get("/songs/all", func(w http.ResponseWriter, r *http.Request) {

		songs, err := services.GetAllSongs()
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(songs)
	})

	// Get song by ID

	router.Get("/songs/get/{id}", func(w http.ResponseWriter, r *http.Request) {

		songId, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: "invalid song id"})
			return
		}

		song, errDto := services.GetSongByID(songId)
		if errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(song)
	})

	// Get songs by title
	router.Get("/songs/title/{title}", func(w http.ResponseWriter, r *http.Request) {
		title := chi.URLParam(r, "title")
		songs, errDto := services.GetSongsByTitle(title)
		if errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(songs)
	})

	// Get artist's songs (both published and unpublished)
	router.With(auth.Authenticate).Get("/artist/songs", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		songs, err := services.GetArtistSongs(currentUser.ID)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(songs)
	})

	// Upload a new song (artist only)
	router.With(auth.Authenticate).Post("/songs/create", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		var songData dtos.UploadSongDto
		if err := json.NewDecoder(r.Body).Decode(&songData); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: err.Error()})
			return
		}

		if err := services.CreateSong(currentUser.ID, &songData); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	// Delete a song (artist only)
	router.With(auth.Authenticate).Delete("/songs/delete/{id}", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		songId := chi.URLParam(r, "id")

		songIdInt, err := strconv.Atoi(songId)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: "invalid song id"})
			return
		}

		if err := services.DeleteSong(currentUser.ID, songIdInt); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(err)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	// Playlist routes
	router.With(auth.Authenticate).Post("/playlists/create", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		var playlistData dtos.CreatePlaylistDto
		if err := json.NewDecoder(r.Body).Decode(&playlistData); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: err.Error()})
			return
		}

		playlist, errDto := services.CreatePlaylist(currentUser.ID, &playlistData)
		if errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(playlist)
	})

	router.With(auth.Authenticate).Get("/playlists", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		playlists, errDto := services.GetUserPlaylists(currentUser.ID)
		if errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(playlists)
	})

	router.With(auth.Authenticate).Post("/playlists/{id}/songs", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		playlistId, _ := strconv.Atoi(chi.URLParam(r, "id"))

		var songData dtos.AddSongToPlaylistDto
		if err := json.NewDecoder(r.Body).Decode(&songData); err != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(&dtos.ErrorDto{Message: err.Error()})
			return
		}

		if errDto := services.AddSongToPlaylist(currentUser.ID, playlistId, songData.SongID); errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	router.With(auth.Authenticate).Delete("/playlists/{playlistId}/songs/{songId}", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		playlistId, _ := strconv.Atoi(chi.URLParam(r, "playlistId"))
		songId, _ := strconv.Atoi(chi.URLParam(r, "songId"))

		if errDto := services.RemoveSongFromPlaylist(currentUser.ID, playlistId, songId); errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	// Favorites routes
	router.With(auth.Authenticate).Post("/favorites/add/{songId}", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		songId, _ := strconv.Atoi(chi.URLParam(r, "songId"))

		if errDto := services.AddToFavorites(currentUser.ID, songId); errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	router.With(auth.Authenticate).Delete("/favorites/remove/{songId}", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		songId, _ := strconv.Atoi(chi.URLParam(r, "songId"))

		if errDto := services.RemoveFromFavorites(currentUser.ID, songId); errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
	})

	router.With(auth.Authenticate).Get("/favorites", func(w http.ResponseWriter, r *http.Request) {
		currentUser := auth.GetAuthUser(r)
		favorites, errDto := services.GetUserFavorites(currentUser.ID)
		if errDto != nil {
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(errDto)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(favorites)
	})

	http.ListenAndServe("0.0.0.0:8002", router)

}
