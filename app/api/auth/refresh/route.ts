import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_MAX_AGE,
  cookieBaseOptions,
} from "@/lib/auth-cookies";
import { backendRefresh } from "@/lib/backend-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tokens = await backendRefresh(refreshToken);

  if (!tokens) {
    const out = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    out.cookies.delete({ name: ACCESS_TOKEN_COOKIE, path: "/" });
    out.cookies.delete({ name: REFRESH_TOKEN_COOKIE, path: "/" });
    return out;
  }

  const out = NextResponse.json({ ok: true });
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
