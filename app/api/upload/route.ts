import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { UPLOAD_BUCKET, r2 } from "@/lib/r2";
import { createClient } from "@/lib/supabase/server";

const Body = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.enum(["audio/mpeg", "audio/mp4", "audio/wav", "audio/x-m4a"]),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const key = `${user.id}/${randomUUID()}-${parsed.data.filename}`;
  const url = await getSignedUrl(
    r2,
    new PutObjectCommand({
      Bucket: UPLOAD_BUCKET,
      Key: key,
      ContentType: parsed.data.contentType,
    }),
    { expiresIn: 600 },
  );

  return NextResponse.json({ url, key });
}
