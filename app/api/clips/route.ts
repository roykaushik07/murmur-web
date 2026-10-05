import { NextResponse } from "next/server";
import { z } from "zod";

const Body = z.object({
  episodeId: z.string().uuid(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  style: z.enum(["bold", "minimal", "karaoke"]).default("bold"),
});

async function forward(path: string, init: RequestInit) {
  const { apiFetch } = await import("@/lib/api");
  return apiFetch(path, init);
}

export async function GET(request: Request) {
  const episodeId = new URL(request.url).searchParams.get("episodeId");
  const upstream = await forward(`/clips?episodeId=${episodeId ?? ""}`, { method: "GET" });
  return NextResponse.json(await upstream.json(), { status: upstream.status });
}

export async function POST(request: Request) {
  const body = Body.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 });

  const upstream = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clips`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: request.headers.get("authorization") ?? "",
    },
    body: JSON.stringify(body.data),
  });
  return NextResponse.json(await upstream.json(), { status: upstream.status });
}
