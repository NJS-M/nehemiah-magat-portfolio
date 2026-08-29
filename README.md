# Nehemiah James S. Magat — Portfolio

A single-page professional portfolio. Static HTML, hand-written modern CSS, and vanilla
JavaScript. **No build step, no dependencies, no npm install.** Open `index.html` and it runs.

---

## Deploying to Vercel

### Option A — drag and drop (fastest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag this whole folder onto the page
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Deploy.

### Option B — Vercel CLI

```bash
npm i -g vercel
cd nehemiah-portfolio
vercel          # preview deployment
vercel --prod   # production
```

### Option C — GitHub (recommended long-term)

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

Then import the repo at [vercel.com/new](https://vercel.com/new). Every push to `main`
redeploys automatically.

### After the first deploy

**Nothing to edit — the URL is already set.** All SEO tags, `robots.txt` and `sitemap.xml` point at
`https://nehemiah-magat.vercel.app`, so name the Vercel project exactly **`nehemiah-magat`** and it
matches out of the box.

If you use a different project name, or later buy a real domain, run the included helper from
inside this folder instead of editing by hand:

```powershell
.\set-domain.ps1 https://your-new-url.com     # Windows
```
```bash
./set-domain.sh https://your-new-url.com       # Mac / Linux
```

It rewrites `index.html`, `robots.txt` and `sitemap.xml` in one pass.

**Full step-by-step deployment instructions are in `DEPLOY.md`.**

---

## Local preview

Because paths are absolute (`/assets/...`), open it through a server rather than
double-clicking the file:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Structure

```
.
├── index.html              All page content. Single file, semantic sections.
├── vercel.json             Clean URLs, cache headers, security headers.
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── assets/
    ├── css/styles.css      Design tokens at the top, then components in page order.
    ├── js/main.js          Theme, nav, reveals, scrollspy, tabs, lightbox.
    └── img/
        ├── nehemiah-magat.webp / .jpg      Hero portrait (4:5)
        ├── nehemiah-magat-square.webp      Mobile avatar + apple-touch-icon
        ├── og-cover.jpg                    Social share card (1200×630)
        ├── caps-*.webp                     Six CAPS screenshots
        └── signsaya-*.webp                 Five SignSaya project figures
```

---

## Editing content

Everything is in `index.html`, in the order it appears on the page. The sections are marked
with comment banners like `<!-- ===== EXPERIENCE ===== -->`, so search for the section name.

**Section order** — Hero → evidence strip → 01 About (bio + the five pillars) → 02 Experience →
02.1 CAPS case study → 03 Academic Journey → 03.1 SignSaya → 04 Selected Projects → 05 Skills →
06 Credentials & Achievements → 07 Contact. The two `.1` sections are sub-chapters: CAPS belongs to
the DILG role, SignSaya to the degree. They are deliberately kept out of the navigation and reached
by cross-links instead, which is why the nav is six items rather than nine. Each carries a
`data-spy` attribute naming its parent section, so scrolling into CAPS highlights *Experience* in
the nav and scrolling into SignSaya highlights *Academic*.

**Changing colours or type** — open `assets/css/styles.css`. The first ~60 lines are design
tokens. Change `--accent` in both the light block (`:root`) and the two dark blocks and the
whole site follows.

**Adding an experience entry** — copy an existing `<article class="xp-item">` block and edit it.

**Adding a CAPS screenshot** — drop the image in `assets/img/`, then copy an existing
`<figure class="shot">` block. The lightbox picks it up automatically; no JS changes needed.

**Adding a SignSaya figure** — same idea, but copy a `<figure class="plate">` block inside the
`.plates` grid and increment the caption number. Plates letterbox the image on white at 16:9 so
nothing is ever cropped; add `class="plate portrait"` for a portrait photograph instead.

**A note on bullets:** the `.xp-bullets` and `.tick-list` markers are absolutely positioned,
not grid columns. Don't switch them back to a grid layout — inline `<strong>` tags inside a
grid list item become separate grid items and the text scatters across rows.

---

## What the site does

- **Responsive** at every width. Mobile is a genuinely different layout, not a shrunk desktop:
  circular avatar, single-column timeline, drawer navigation.
- **Dark mode.** Follows the OS setting by default; the toggle in the navigation overrides it
  and remembers the choice.
- **Accessible.** Skip link, semantic landmarks, real ARIA tab pattern with arrow-key support,
  focus-visible outlines, keyboard-operable lightbox, and full `prefers-reduced-motion` support.
- **SEO.** Title, meta description, canonical URL, Open Graph and Twitter cards, a JSON-LD
  `Person` schema, semantic heading order, and descriptive alt text on every image.
- **Fast.** Roughly 400 KB total including all seven images. One external request (Google Fonts).

---

## Content rules this site was built under

Every factual claim traces back to source material Nehemiah supplied. Specifically:

- **Active Directory** is described as basic account and password administration, attributed
  to Clark Outsourcing only. He does not administer AD at DILG.
- **Microsoft 365** is "daily use and end-user support", not admin-centre administration.
- **DNS, DHCP and VLANs** appear only under a labelled *CompTIA Network+ coursework* heading —
  never as hands-on experience.
- **The recabling project** reads "initiated and planned … coordinating execution with
  colleagues." He planned it; colleagues did the physical work.
- **SignSaya was a group thesis**, and the section says so. Nehemiah's contribution is stated as
  second lead developer — the ESP32-to-Flutter BLE connection, the manuscript, and coordination with
  DOST-EPDC. The hardware documentation is captioned as **the team's project documentation** and is
  not attributed to him.
- **The DOST internship system** is not named, per NDA.
- **BizKit client names** are omitted.
- **GWA figures** are shown with an explicit note that 1.00 is the highest attainable grade
  on the Philippine scale, because overseas readers assume a 4.0 scale.
- **No invented metrics.** The only numbers on the site are ones Nehemiah provided:
  250+ endpoints, 1,300+ applicants, 20+ vacancies, 6,500+ documents (1,300 × the five-document
  minimum), 91.13%, 68.57%, and the GWA figures.

If you edit this site later, keep to that standard.
