import Link from "next/link";
import { apiFetch } from "@/lib/api";
import type { Episode } from "@/lib/types";

export default async function DashboardPage() {
  const res = await apiFetch("/episodes");
  const episodes: Episode[] = res.ok ? await res.json() : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Your episodes</h1>
      <ul className="mt-6 divide-y divide-zinc-800">
        {episodes.map((ep) => (
          <li key={ep.id} className="flex items-center justify-between py-4">
            <Link href={`/episodes/${ep.id}`} className="hover:underline">
              {ep.title}
            </Link>
            <span className="text-sm text-zinc-500">{ep.status}</span>
          </li>
        ))}
        {episodes.length === 0 && <li className="py-4 text-zinc-500">No episodes yet.</li>}
      </ul>
    </main>
  );
}
