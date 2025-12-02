## VoyagerAI Mobile (Simple React Native Wrapper)

This is a **very simple React Native / Expo app** that just opens your existing VoyagerAI web app in a full-screen WebView.

You can use this to run the project on a mobile phone using a URL.

---

## 1. Create the Expo app

From a terminal (you can do this anywhere, it doesn't have to be inside this repo):

```bash
npx create-expo-app voyagerai-mobile
cd voyagerai-mobile
npm install react-native-webview
```

---

## 2. Replace the generated `App.(js|tsx)` with this one

Copy the `App.tsx` from:

```text
VoyagerAI/mobile/App.tsx
```

Into the `App.tsx` (or `App.js`) file inside your new Expo project (`voyagerai-mobile`).

Then open that file and set the correct URL:

```ts
// In App.tsx
const VOYAGER_URL = "https://your-deployed-voyager-url.com";
// or for local dev: "http://YOUR_LOCAL_IP:3000"
```

To get your local IP (for running against `npm run dev` on your laptop), you can run:

```bash
ipconfig getifaddr en0   # macOS Wi‑Fi (often works)
```

Then use:

```ts
const VOYAGER_URL = "http://<that-ip>:3000";
```

Make sure your phone and laptop are on the **same Wi‑Fi network**.

---

## 3. Run it on your phone

Inside the Expo project (`voyagerai-mobile`):

```bash
npm start
```

Then:
- Install the **Expo Go** app on your phone (Android or iOS).
- Scan the QR code from the terminal or browser.
- The VoyagerAI web app will open inside the mobile app.

---

## Notes

- This app is intentionally **very simple**: it's just a WebView around your existing site.
- All the logic (auth, search, AI chat, itineraries, etc.) stays in your current VoyagerAI frontend/backend.
- If you later deploy VoyagerAI to a real URL (e.g. Vercel), just update `VOYAGER_URL` to that URL and rebuild.


