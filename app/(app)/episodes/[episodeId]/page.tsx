import { notFound } from "next/navigation";
import { ClipEditor } from "@/components/ClipEditor";
import { apiFetch } from "@/lib/api";

export default async function EpisodePage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = await params;
  const res = await apiFetch(`/episodes/${episodeId}`);
  if (!res.ok) notFound();
  const episode = await res.json();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold">{episode.title}</h1>
      <div className="mt-8">
        <ClipEditor episodeId={episode.id} segments={episode.segments ?? []} />
      </div>
    </main>
  );
}
