# TNsnack (Expo Snack demo)

This folder is a Snack-friendly copy of the mobile app.

## How to run as a Snack demo

1. Open https://snack.expo.dev
2. Create a new Snack (Expo Router / Tabs template).
3. In the Snack file tree, add the files from this `TNsnack/` folder (drag/drop or copy/paste).
4. Add dependency: `babel-plugin-module-resolver`
5. Set environment variable (recommended): `EXPO_PUBLIC_API_BASE_URL` to a public API URL.

If you don’t have a public API, you can still demo UI by mocking responses in `lib/api.ts`.
