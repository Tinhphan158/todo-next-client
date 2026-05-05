import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  cookieBaseOptions,
} from "@/lib/auth-cookies";
import { backendRefresh } from "@/lib/backend-auth";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

async function fetchProfile(accessToken: string) {
  return fetch(`${BACKEND_URL}/api/profiles/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
}

function userPayload(u: {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}) {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    avatar: u.avatar,
  };
}

export async function GET(req: NextRequest) {
  let accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  if (accessToken) {
    const profileRes = await fetchProfile(accessToken);
    if (profileRes.ok) {
      const userData = await profileRes.json();
      return NextResponse.json({ user: userPayload(userData) });
    }
  }

  if (refreshToken) {
    const tokens = await backendRefresh(refreshToken);
    if (tokens) {
      const profileRes = await fetchProfile(tokens.accessToken);
      if (profileRes.ok) {
        const userData = await profileRes.json();
        const out = NextResponse.json({ user: userPayload(userData) });
        out.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
          ...cookieBaseOptions,
          maxAge: ACCESS_TOKEN_MAX_AGE,
        });
        out.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
          ...cookieBaseOptions,
          maxAge: REFRESH_TOKEN_MAX_AGE,
        });
        return out;
      }
    }
  }

  return NextResponse.json({ user: null });
}
