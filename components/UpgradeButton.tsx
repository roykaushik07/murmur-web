"use client";

export function UpgradeButton({ plan }: { plan: "pro-monthly" | "pro-annual" }) {
  async function upgrade() {
    const res = await fetch("/api/billing", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ subscription: plan }),
    });
    const { url } = await res.json();
    window.location.assign(url);
  }

  return (
    <button onClick={upgrade} className="rounded-lg border border-murmur-500 px-4 py-2 text-sm">
      {plan === "pro-annual" ? "Go Pro (annual)" : "Go Pro (monthly)"}
    </button>
  );
}
