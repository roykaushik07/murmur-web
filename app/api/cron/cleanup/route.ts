import { DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { UPLOAD_BUCKET, r2 } from "@/lib/r2";

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Invoked daily by Vercel Cron (see vercel.json). Removes orphaned uploads that
// were never attached to an episode.
export async function GET(request: Request) {
  if (request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const cutoff = Date.now() - MAX_AGE_MS;
  const listed = await r2.send(
    new ListObjectsV2Command({ Bucket: UPLOAD_BUCKET, Prefix: "pending/" }),
  );
  const stale = (listed.Contents ?? [])
    .filter((o) => o.Key && o.LastModified && o.LastModified.getTime() < cutoff)
    .map((o) => ({ Key: o.Key! }));

  if (stale.length > 0) {
    await r2.send(new DeleteObjectsCommand({ Bucket: UPLOAD_BUCKET, Delete: { Objects: stale } }));
  }

  return NextResponse.json({ deleted: stale.length });
}
