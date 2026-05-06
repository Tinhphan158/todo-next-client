export type OtpPurpose = "SIGNUP" | "RESET_PASSWORD";

export interface Account {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  accessToken: string;
  refreshToken: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface MessageResponse {
  message: string;
}
