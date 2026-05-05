export const ACCESS_TOKEN_COOKIE = "access_token";
export const REFRESH_TOKEN_COOKIE = "refresh_token";

export const cookieBaseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const ACCESS_TOKEN_MAX_AGE = Number(
  process.env.JWT_ACCESS_MAX_AGE ?? 900,
);
export const REFRESH_TOKEN_MAX_AGE = Number(
  process.env.JWT_REFRESH_MAX_AGE ?? 604800,
);
