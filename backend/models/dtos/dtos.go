package dtos

type CredentialSignupDto struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IsArtist bool   `json:"isArtist,string"`
}

type CredentialSigninDto struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type OAuthDto struct {
	Provider    string `json:"provider"`
	AccessToken string `json:"accessToken"`	
}


type AccessDto struct {
	Bearer string `json:"bearer"`
}

type ErrorDto struct {
	Message string `json:"message"`
}

type UserDto struct {
	ID              int    `json:"id"`
	Name            string `json:"name"`
	Email           string `json:"email"`
	IsEmailVerified bool   `json:"isEmailVerified"`
	IsArtist        bool   `json:"isArtist"`
}

type RegistrationDto struct {
	*UserDto
	AccessToken string `json:"accessToken"`
}

type EmailVerifyDto struct {
	Token string `json:"token"`
}
