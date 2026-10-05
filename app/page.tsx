import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="text-5xl font-semibold tracking-tight">
        Your best podcast moments, captioned and ready to share.
      </h1>
      <p className="mt-6 text-lg text-zinc-400">
        Upload an episode, pick the lines worth sharing, and Murmur renders a captioned
        clip in seconds.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/dashboard" className="rounded-lg bg-murmur-500 px-5 py-3 font-medium hover:bg-murmur-600">
          Open dashboard
        </Link>
      </div>
    </main>
  );
}
