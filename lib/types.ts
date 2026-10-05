export type Episode = {
  id: string;
  title: string;
  status: "uploaded" | "transcribing" | "ready" | "failed";
  durationMs: number | null;
  createdAt: string;
};

export type Clip = {
  id: string;
  episodeId: string;
  startMs: number;
  endMs: number;
  style: "bold" | "minimal" | "karaoke";
  status: "queued" | "rendering" | "done" | "failed";
  fileKey: string | null;
};
