import { NextResponse } from "next/server";

const DISCORD_USER_ID = "862901280653574205";
const ALLOWED_STATUSES = new Set(["online", "idle", "dnd", "offline"]);
const UPSTREAM_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const response = await fetch(UPSTREAM_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return NextResponse.json(
        { discord_status: "offline" },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0"
          }
        }
      );
    }

    const payload = await response.json();
    const status = ALLOWED_STATUSES.has(payload?.data?.discord_status)
      ? payload.data.discord_status
      : "offline";

    return NextResponse.json(
      { discord_status: status },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0"
        }
      }
    );
  } catch {
    return NextResponse.json(
      { discord_status: "offline" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0"
        }
      }
    );
  }
}
