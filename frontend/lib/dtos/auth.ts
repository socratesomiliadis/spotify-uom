export interface OAuthDto {
  provider: string;
  accessToken: string;
}

export interface CredentialLoginDto {
  email: string;
  password: string;
}

export interface CredentialSignupDto {
  name: string;
  email: string;
  password: string;
  isArtist: boolean;
}

export interface AccessDto {
  bearer: string;
}
