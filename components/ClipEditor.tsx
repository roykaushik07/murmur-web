"use client";

import { useState } from "react";

type Segment = { startMs: number; endMs: number; text: string };

export function ClipEditor({ episodeId, segments }: { episodeId: string; segments: Segment[] }) {
  const [range, setRange] = useState<[number, number] | null>(null);
  const [saving, setSaving] = useState(false);

  async function createClip() {
    if (!range) return;
    setSaving(true);
    const res = await fetch("/api/clips", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ episodeId, startMs: range[0], endMs: range[1], style: "bold" }),
    });
    const clip = await res.json();
    setSaving(false);
    if (res.ok) window.location.assign(`/c/${clip.id}`);
  }

  return (
    <div>
      <div className="space-y-1">
        {segments.map((s) => {
          const selected = range && s.startMs >= range[0] && s.endMs <= range[1];
          return (
            <button
              key={s.startMs}
              onClick={() => setRange(range ? [Math.min(range[0], s.startMs), Math.max(range[1], s.endMs)] : [s.startMs, s.endMs])}
              className={`block w-full rounded px-3 py-2 text-left ${selected ? "bg-murmur-600/30" : "hover:bg-zinc-800"}`}
            >
              {s.text}
            </button>
          );
        })}
      </div>
      <button
        disabled={!range || saving}
        onClick={createClip}
        className="mt-6 rounded-lg bg-murmur-500 px-4 py-2 disabled:opacity-40"
      >
        {saving ? "Creating..." : "Create clip"}
      </button>
    </div>
  );
}
