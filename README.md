# SPOTIFY CLONE

This a [Spotify]() clone webapp built using react.js, next.js (13 version), [supabase]() and [stripe]().

## FEATURES

- [x] Authentication system with sign in and sign up using an email and password;
- [x] Authentication system with sign in with a Github account;
- [x] Upload a music (.mp3 file) while authenticated;
- [x] List all musics on our database and store;
- [x] Play/pause music (and mute/unmute or diminished or raise the volume) while authenticated;
- [x] Add/remove musics from favorite list (liked musics);
- [x] Listen a list of music (the favorite list) with the option to listen the previous or skip to the next music;
- [] 

## HOW TO MAKE WORK

1. First of all, open up a terminal at the root folder and type the follow command: ``npm install``;
2. Now open up the file ``.env.example`` and copy and paste its content;
3. Create a new file at the project root named ``.env.local`` and paste the copied content, it must look like this:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```
4. Now is time to create a new account at [Supabase]() at get the url, anon key and the service role key;
5. Fill up the values at the env.local;
6. Create a new account at [Stripe]() at get the publishablle key and secret key and fill their values at the env variables at ``env.local``;

## [DEMO]()


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
