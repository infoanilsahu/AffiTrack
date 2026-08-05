import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../lib/redis";

export async function GET(req: NextRequest) {
    await client.lPush(
    "header",
    JSON.stringify({
      headers: Object.fromEntries(req.headers),
      time: Date.now(),
    })
  );

  return NextResponse.redirect("https://amazon.in");
}