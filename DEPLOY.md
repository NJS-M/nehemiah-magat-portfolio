# Deploying this portfolio to Vercel

Everything in this folder is already deploy-ready. There is **no build step, no npm install, no
configuration** — it is plain HTML, CSS and JavaScript. Vercel serves it as-is.

Total time: about 10 minutes.

---

## Before you start — what I already did for you

| Done | Detail |
|---|---|
| ✅ Public URL written in | All SEO tags now point at `https://nehemiah-magat.vercel.app` |
| ✅ Sitemap dated | `sitemap.xml` refreshed |
| ✅ Social share card | `assets/img/og-cover.jpg` (1200×630) is in place and referenced |
| ✅ Favicon | `favicon.svg` |
| ✅ Caching + security headers | `vercel.json` — long cache on assets, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` |
| ✅ Verified | No console errors, no broken images, no horizontal scroll at 390 / 820 / 1440px |

> ### ⚠️ One thing you must match
> When Vercel asks for the **project name**, type exactly:
> ```
> nehemiah-magat
> ```
> That produces `nehemiah-magat.vercel.app`, which is the URL already written into the file.
> If you use a different name, run the fix in **Section 6** afterwards — it's one command.

---

## 1. Pre-flight — look at it once (2 minutes)

Before publishing, open it locally so there are no surprises.

**Windows:** open the folder in File Explorer, click the address bar, type `powershell`, press Enter,
then run:

```powershell
python -m http.server 8000
```

Open <http://localhost:8000> in your browser.

> Don't just double-click `index.html`. The paths are absolute (`/assets/...`), so it needs a
> server. If `python` isn't installed, skip this — you can check just as well on the live URL in
> five minutes.

**Check these:**

- [ ] Your name and photo load at the top
- [ ] The CAPS screenshots and the five SignSaya figures all appear
- [ ] Clicking a figure opens it full-size; `Esc` closes it
- [ ] The sun/moon button switches light and dark
- [ ] Narrow the window to phone width — the menu becomes a hamburger, nothing overflows sideways
- [ ] Read the Experience and Academic sections once. **This is your last easy proofread.**

Press `Ctrl+C` in PowerShell to stop the server.

---

## 2. Create a Vercel account

Go to <https://vercel.com/signup>.

**Sign up with GitHub** — even if you plan to drag-and-drop today. It costs nothing and it keeps
the GitHub option open, which you'll want later.

Choose the **Hobby** plan. It's free, and it's the correct plan for a personal portfolio.

---

## 3. Deploy — pick one route

### Route A — GitHub (recommended)

Slower to set up by about five minutes, and worth it. Every future edit goes live by pushing.
It also gives you a **public GitHub repository link** — something your résumé currently lacks, and
one of the few remaining gaps in your application materials.

**Install Git** if you don't have it: <https://git-scm.com/download/win>

**Create the repository:** go to <https://github.com/new>, name it `portfolio`, set it **Public**,
and do **not** tick "Add a README" (this folder already has one).

**Then, in PowerShell inside this folder:**

```powershell
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

**Connect it to Vercel:**

1. Go to <https://vercel.com/new>
2. Click **Import** next to your `portfolio` repository
3. **Project Name:** `nehemiah-magat` ← must match exactly
4. **Framework Preset:** `Other`
5. Leave **Build Command** and **Output Directory** empty
6. Click **Deploy**

Roughly 30 seconds later it's live.

---

### Route B — Drag and drop (fastest)

1. Go to <https://vercel.com/new>
2. Scroll down and find the drag-and-drop area
3. Drag **this whole folder** onto it — the folder itself, not its contents, and not the `.zip`
4. **Project Name:** `nehemiah-magat` ← must match exactly
5. **Framework Preset:** `Other`. Leave build settings empty.
6. Click **Deploy**

Note: with this route, updating later means dragging the folder again. Route A is one command.

---

## 4. After it goes live — verify (5 minutes)

Open `https://nehemiah-magat.vercel.app` and check:

- [ ] The page loads and the photo appears
- [ ] Open it on your **phone** — this matters most; a lot of recruiters open links on mobile
- [ ] Click through every navigation item
- [ ] Both theme modes work
- [ ] `https://nehemiah-magat.vercel.app/robots.txt` returns text
- [ ] `https://nehemiah-magat.vercel.app/sitemap.xml` returns XML

**Test the link preview** — this is what people see when you paste the URL into LinkedIn or a
message. Paste your URL into:

- <https://www.linkedin.com/post-inspect/> (LinkedIn's own tool)
- <https://opengraph.xyz>

You should see your name, title and portrait in a wide card. If LinkedIn shows something stale,
use its "Inspect" button to force a refresh.

**Optional — get it into Google:** go to <https://search.google.com/search-console>, add
`nehemiah-magat.vercel.app` as a URL-prefix property, verify with the HTML-tag method, then submit
`sitemap.xml` under **Sitemaps**. Indexing takes a few days.

---

## 5. Put the link where it counts

The site only works if people reach it. Add the URL to:

- **LinkedIn** — Contact info → Website, and again in your headline or About section
- **Your résumé** — in the contact line, next to your email
- **Your email signature**
- **Job applications** — most forms have a "portfolio" or "website" field; it is almost always empty

---

## 6. Changing the URL later

If you named the Vercel project something else, or you buy a real domain, run the included script
from inside this folder:

**Windows (PowerShell):**
```powershell
.\set-domain.ps1 https://your-new-url.com
```

If PowerShell blocks the script, run this once first:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Mac / Linux:**
```bash
./set-domain.sh https://your-new-url.com
```

It updates `index.html`, `robots.txt` and `sitemap.xml` in one pass. Then redeploy (push, or drag
the folder again).

### Adding a custom domain

A real domain like `nehemiahmagat.com` costs roughly ₱600–900 per year and looks considerably
stronger than a `.vercel.app` subdomain. Buy it from Namecheap, Porkbun or Cloudflare, then:

1. In Vercel: **Project → Settings → Domains → Add**
2. Enter your domain; Vercel shows the DNS records to create
3. Add those records at your registrar
4. Wait — usually minutes, occasionally a few hours
5. Run `set-domain.ps1 https://yourdomain.com` and redeploy

HTTPS is issued automatically and free.

---

## 7. Updating the site later

**If you used Route A (GitHub):**
```powershell
git add .
git commit -m "what you changed"
git push
```
Live in about 30 seconds. Vercel keeps every previous version, so you can roll back from the
dashboard if something breaks.

**If you used Route B:** drag the folder onto the same Vercel project again.

**What to edit:** everything is in `index.html`, in the order it appears on the page, marked with
comment banners like `<!-- ===== EXPERIENCE ===== -->`. Colours and fonts are in the first ~60
lines of `assets/css/styles.css`. See `README.md` for the details.

---

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Page loads but no styling | The folder was uploaded without its `assets` subfolder. Re-upload the whole folder. |
| Images missing | Same cause. Confirm `assets/img/` has 16 files. |
| 404 on the root | You dragged the *contents* instead of the folder, or `index.html` isn't at the top level. |
| Link preview shows nothing | The URL in the OG tags doesn't match the live URL. Run `set-domain` and redeploy, then force a refresh in LinkedIn's post inspector. |
| Old version still showing | Hard-refresh with `Ctrl+F5`. Assets are cached for a year by design — that's why `vercel.json` caches `/assets/*` aggressively and the HTML not at all. |
| Fonts look plain | The Google Fonts request was blocked. Check your network; the site still reads fine with fallback fonts. |

---

## What this costs

Nothing. Vercel's Hobby plan covers a static personal portfolio comfortably — 100 GB of bandwidth
a month, free HTTPS, unlimited deployments. You would need tens of thousands of visitors a month
to approach the limit.

The only thing you'd ever pay for is a custom domain, and that's optional.
