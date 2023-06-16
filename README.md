# SPOTIFY CLONE

This a [Spotify](https://open.spotify.com/intl-pt?) clone webapp built using react.js, next.js (13 version), [supabase](https://supabase.com/) and [stripe](https://stripe.com/br).

## FEATURES

- [x] Authentication System with sign in with a Github account;
- [x] Upload a music (.mp3 file) while authenticated (and being a premium user);
- [x] Listen to music while authenticated (and being a premium user);
- [x] List all your favorite musics while authenticated;
- [x] List all uploaded music on our database;
- [x] Music player controller: raise and lower volume, mute and unmute, pause/play, automatic plays next music when finneshed one in a list;
- [x] Premium system with stripe payment API. 

## HOW TO MAKE WORK ON LOCALHOST

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
4. Now is time to create a new account at [Supabase](https://supabase.com/) at get the url, anon key and the service role key;
5. Fill up the values at the env.local;
6. Create a new account at [Stripe](https://stripe.com/br) at get the publishablle key and secret key and fill their values at the env variables at ``env.local``;
7. Go to Stripe dashboard and downloaded the stripe cli and sign in with your stripe's account on stripe cli. Now you shall have the webhook_secret for you test application;
8. Now you can fill up the ``STRIPE_WEBHOOK_SECRET`` env. variable at ``env.local``;
9. Now you can type in the terminal at the project root the command: ``npm start`` or ``npm run dev``;

## [DEMO](https://spotify-clone-app-iota.vercel.app/)