import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  cookieBaseOptions,
} from "@/lib/auth-cookies";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    return new NextResponse(text, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") || "application/json",
      },
    });
  }

  let data: {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    accessToken: string;
    refreshToken: string;
  };

  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json({ message: "Invalid backend response" }, { status: 502 });
  }

  const { accessToken, refreshToken, ...publicUser } = data;

  const out = NextResponse.json(publicUser, { status: 200 });

  out.cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
    ...cookieBaseOptions,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  out.cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    ...cookieBaseOptions,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return out;
}
