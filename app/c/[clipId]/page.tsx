import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Clip } from "@/lib/types";

async function getClip(clipId: string): Promise<Clip | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clips/${clipId}/public`, {
    next: { revalidate: 60 },
  });
  return res.ok ? res.json() : null;
}

export async function generateMetadata({ params }: { params: Promise<{ clipId: string }> }): Promise<Metadata> {
  const { clipId } = await params;
  return { title: "Shared clip", openGraph: { type: "video.other", url: `${process.env.NEXT_PUBLIC_SITE_URL}/c/${clipId}` } };
}

export default async function SharePage({ params }: { params: Promise<{ clipId: string }> }) {
  const { clipId } = await params;
  const clip = await getClip(clipId);
  if (!clip || clip.status !== "done" || !clip.fileKey) notFound();

  return (
    <main className="mx-auto flex max-w-md justify-center px-6 py-12">
      <video
        controls
        playsInline
        className="w-full rounded-xl"
        src={`${process.env.NEXT_PUBLIC_CLIPS_CDN}/${clip.fileKey}`}
      />
    </main>
  );
}
