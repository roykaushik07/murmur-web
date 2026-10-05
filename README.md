# murmur-web

The Murmur web app: upload podcast episodes, edit captioned clips, and share them.

Next.js 15 (App Router, TypeScript) with Tailwind, deployed on Vercel.

## How it fits

- **murmur-api** handles episodes, clips and billing webhooks. This app proxies clip
  requests to it using `NEXT_PUBLIC_API_URL`.
- **Supabase** provides auth (`@supabase/ssr`) and the shared Postgres database.
- **Cloudflare R2** stores uploaded audio; the browser uploads directly using presigned URLs.
- **Stripe Checkout** handles Pro upgrades.
- Rendered clips are served from the CDN configured in `NEXT_PUBLIC_CLIPS_CDN`.

## Local development

```sh
cp .env.example .env.local
npm install
npm run dev
```

## Deploy

Pushes to `main` deploy through Vercel. Region and cron schedules live in `vercel.json`.
