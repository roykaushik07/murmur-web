import { createClient } from "@/lib/supabase/server";

/** Calls murmur-api with the signed-in user's Supabase access token. */
export async function apiFetch(path: string, init: RequestInit = {}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      "content-type": "application/json",
      authorization: `Bearer ${session?.access_token ?? ""}`,
    },
  });
}
