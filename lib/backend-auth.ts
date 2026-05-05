const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function backendRefresh(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> {
  const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  try {
    return (await res.json()) as {
      accessToken: string;
      refreshToken: string;
    };
  } catch {
    return null;
  }
}
