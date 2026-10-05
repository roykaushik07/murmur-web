"use client";

import { useState } from "react";

export function UploadButton({ onUploaded }: { onUploaded: (key: string) => void }) {
  const [busy, setBusy] = useState(false);

  async function handleFile(file: File) {
    setBusy(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      const { url, key } = await res.json();
      await fetch(url, { method: "PUT", body: file, headers: { "content-type": file.type } });
      onUploaded(key);
    } finally {
      setBusy(false);
    }
  }

  return (
    <label className="inline-flex cursor-pointer rounded-lg bg-murmur-500 px-4 py-2 text-sm font-medium hover:bg-murmur-600">
      {busy ? "Uploading..." : "Upload episode"}
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />
    </label>
  );
}
