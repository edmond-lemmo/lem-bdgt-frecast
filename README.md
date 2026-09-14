# Money

Household budget forecast and spend logger. Log spends and transfers, and it
projects your balance day by day, works out what is safe to spend, and shows
when you will bottom out.

Everything is in `index.html`. No build step, no folders, no npm.

## Publishing it

The `index.html` in this folder is the **public copy**. It contains no
balances, no bills and no purchase history, only the app itself. Anyone who
finds the URL sees an empty app, not your money.

Your actual data is in `my-data-backup.txt`. **Never upload that file to
GitHub.** Keep it in your password manager, or a note only you can see.

1. In the repo, delete the old `src`, `public` and `.github` folders, plus
   `package.json`, `vite.config.js` and `.gitignore`. Nothing needs them now.
2. Upload these files to the root of `main`: `index.html`,
   `manifest.webmanifest`, `icon.svg`, `icon-192.png`, `icon-512.png` and this
   README. Not `my-data-backup.txt`.
3. **Settings → Pages → Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
4. Wait a minute, then open
   `https://<username>.github.io/<repo-name>/`.

## Loading your data, privately

Do this once per phone. Nothing leaves the device.

1. Open the site and use **Share → Add to Home Screen**.
2. Open the app, tap the settings icon at the top right.
3. Scroll to **Backup**, paste the entire contents of `my-data-backup.txt`
   into the lower box, and tap **Restore backup**.

Your bills, budgets, balances and history appear. From then on the app saves
as you go, on that device.

Do the same on Brigid's phone if she is logging too, but note that the two
copies do not sync with each other.

Take a fresh backup now and then with **Create backup** in the same screen, and
keep it wherever you keep `my-data-backup.txt`. That is your only copy if the
phone is wiped.

## Editing it

Open `index.html` on github.com and click the pencil. The file is in four
parts:

- The `<head>`: page title, colours, icon links and the import map that points
  at React and Recharts.
- One `<script type="module">`: the whole app. Near the top is
  `const SEED_DATA = {...}` with your bills, income, budgets and history.
  Below that are the date helpers, the forecast engine (`occurrences` and
  `buildModel`), the four screens, the bottom sheets, and the stylesheet in the
  `CSS` template literal at the very bottom.
- A small boot script that shows a message if the app cannot start.

The file is about 730KB, most of which is React. Browsers cache it after the
first visit.

Commit, wait a minute for Pages to redeploy, then hard-refresh your phone.

Day-to-day changes to bills, budgets and spending rates are all done in the
app's **Plan** tab. You should not need to touch this file for those.

## Your data

Entries live in your browser's local storage, per device. Nothing is sent
anywhere, and the app has no backend.

Two consequences worth knowing:

- **Clearing site data wipes it.** Use **Settings → Create backup** now and
  then, and keep the text somewhere safe. **Restore backup** brings it back,
  including onto a different phone.
- **Shared mode does not sync here.** Two phones each get their own copy,
  because a static site has no server for them to meet at.

The published `index.html` has nothing personal in it, so the public URL is
safe to have. Your figures exist in two places only: your phone's local
storage, and your copy of `my-data-backup.txt`.

Worth knowing: anyone who picks up your unlocked phone and opens the app can
see your figures, the same as any banking app without a passcode. If that
matters, use your phone's own screen lock.

## Requirements

None beyond a reasonably current browser. React is bundled into the file, so
nothing is fetched at runtime and the app works with no connection at all. The
only network request is the Outfit font from Google, and the app falls back to
your system font if that is blocked.

Because there are no module imports, it also runs when you open `index.html`
straight off your disk, without a web server.

## Notes on the forecast

- Monthly items clamp to the end of short months, so a bill on the 30th falls
  on the 28th in February. Monthly income can move to the Friday before when
  the date lands on a weekend, which is how the 14th-of-the-month pay is set.
- Everyday spending is learned from the last 4, 8 or 12 weeks of your logs,
  averaged by day of the week. Logging a spend uses up that day's estimate, so
  nothing is double counted.
- One-off spends above the cap in Settings are left out of the daily average,
  so a set of footy tickets does not inflate every future Tuesday.
