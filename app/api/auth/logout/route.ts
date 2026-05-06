import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth-cookies";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }).catch(() => {});
  }

  const out = NextResponse.json({ message: "Logged out successfully" });
  out.cookies.delete({ name: ACCESS_TOKEN_COOKIE, path: "/" });
  out.cookies.delete({ name: REFRESH_TOKEN_COOKIE, path: "/" });
  return out;
}
