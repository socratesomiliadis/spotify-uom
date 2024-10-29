package services

import (
	"api/auth"
	"api/db"
	"api/models/domains"
	"api/models/dtos"
)

func GetUserByID(id int) (*dtos.UserDto, *dtos.ErrorDto) {
	user := &domains.User{}
	if err := db.GetInstance().Table(domains.UserTableName).First(user, id).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	userDto := &dtos.UserDto{
		ID:              user.ID,
		Name:            user.Name,
		Email:           user.Email,
		IsEmailVerified: user.IsEmailVerified,
		IsArtist:        user.IsArtist,
	}

	return userDto, nil
}

func VerifyUserEmail(data *dtos.EmailVerifyDto) (*dtos.UserDto, *dtos.ErrorDto) {
	email, err := auth.GetEmailFromVerifierToken(data.Token)
	if err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	user := &domains.User{}
	if err := db.GetInstance().
		Table(domains.UserTableName).
		Where("email=?", email).
		First(user).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	if user.IsEmailVerified {
		userDto := &dtos.UserDto{
			ID:              user.ID,
			Name:            user.Name,
			Email:           user.Email,
			IsEmailVerified: user.IsEmailVerified,
			IsArtist:        user.IsArtist,
		}

		return userDto, nil
	}

	user.IsEmailVerified = true

	if err := db.GetInstance().Table(domains.UserTableName).Save(user).Error; err != nil {
		return nil, &dtos.ErrorDto{Message: err.Error()}
	}

	userDto := &dtos.UserDto{
		ID:              user.ID,
		Name:            user.Name,
		Email:           user.Email,
		IsEmailVerified: user.IsEmailVerified,
		IsArtist:        user.IsArtist,
	}

	return userDto, nil
}
