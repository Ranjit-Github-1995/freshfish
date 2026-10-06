# Fresh Fish Market: website to app

## What changed in the repo

| File | What it does |
|---|---|
| `manifest.json` (new) | App name, icon, colours. Makes the site installable. |
| `sw.js` (new) | Service worker. Caches CSS/JS/fonts so the app opens fast. Never touches Razorpay or the Apps Script webhook. |
| `offline.html` (new) | Screen shown when the phone has no internet. |
| `js/pwa.js` (new) | Registers the service worker and shows an "Install app" button in the navbar. |
| `icons/` (new) | App icons (192, 512, maskable 512, Apple 180, favicon). |
| `index.html` | Added manifest/icon/theme tags, the Install app nav item, and `<script src="js/pwa.js">`. |
| `css/style.css` | Small block at the end for the install button and app mode. |
| `js/custom.js` | PIN now saved in `localStorage` instead of `sessionStorage`, so customers don't re-enter it every time they open the app. |

**Whenever you change index.html, CSS or JS later:** change `VERSION` at the top of `sw.js` (ffm-v1 → ffm-v2) so phones pick up the new files.

## Step 1: Push and test the PWA

1. Copy the files into your repo, commit and push.
2. Open https://ranjit-github-1995.github.io/freshfish/ in Chrome on Android.
3. You should see "Install app" in the menu, or Chrome's own install banner. Install it, open it, and place a ₹1 test order to check Razorpay + UPI + the Google Sheet entry.

## Step 2: Play Store app (Trusted Web Activity)

1. Go to https://www.pwabuilder.com, enter your site URL, click **Package for stores → Android**.
2. Package ID: e.g. `in.freshfishmarket.app` (you can never change this later).
3. Download the zip. It contains:
   - `app-release-bundle.aab` → upload this to Play Console
   - `signing.keystore` + `signing-key-info.txt` → **back these up in 2 safe places. If you lose them you can never update the app.**
   - `assetlinks.json` → see Step 3
4. Play Console ($25 one time) → Create app → upload the .aab to **Closed testing** → add 12 testers → run 14 days → apply for Production.

## Step 3: Remove the browser URL bar (assetlinks.json)

Android only hides the URL bar if it finds `/.well-known/assetlinks.json` at the **root of the domain**. Your site lives at `ranjit-github-1995.github.io/freshfish/`, so the file must be at `ranjit-github-1995.github.io/.well-known/assetlinks.json`, not inside the freshfish repo.

Option A (free): create a repo named exactly `ranjit-github-1995.github.io`, add:
- `.well-known/assetlinks.json` (from the PWABuilder zip)
- an empty file named `.nojekyll` (otherwise GitHub Pages hides folders starting with a dot)

Option B (better for a business): buy a domain like `freshfishmarket.in`, connect it to GitHub Pages, and put `.well-known/assetlinks.json` in this repo with `.nojekyll`. Re-generate the app in PWABuilder with the new URL.

Important: after Play Store upload, go to Play Console → **App integrity → App signing**, copy the **SHA-256 of the app signing key**, and add it to `sha256_cert_fingerprints` in assetlinks.json (keep the existing one too). Play re-signs your app, so without this the URL bar comes back.

## Why Razorpay works in this app

A TWA is real Chrome, not a WebView. Razorpay checkout.js, UPI intents (GPay, PhonePe, Paytm) and OTP pages behave exactly as on the website. No code change needed.

## iPhone

Customers can already install it from Safari: Share → Add to Home Screen (the Install app button shows these instructions). An App Store version needs a Mac, $99/year, and usually extra native features to pass Apple review. Do Android first.
