import { NextResponse } from "next/server";
import { z } from "zod";
import { apiFetch } from "@/lib/api";

const Body = z.object({
  episodeId: z.string().uuid(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  style: z.enum(["bold", "minimal", "karaoke"]).default("bold"),
});

export async function GET(request: Request) {
  const episodeId = new URL(request.url).searchParams.get("episodeId") ?? "";
  const upstream = await apiFetch(`/clips?episodeId=${encodeURIComponent(episodeId)}`);
  return NextResponse.json(await upstream.json(), { status: upstream.status });
}

export async function POST(request: Request) {
  const body = Body.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: body.error.flatten() }, { status: 400 });

  const upstream = await apiFetch("/clips", { method: "POST", body: JSON.stringify(body.data) });
  return NextResponse.json(await upstream.json(), { status: upstream.status });
}
