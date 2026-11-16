# Taufik Khan - Portfolio

Next.js 15 · TypeScript · Tailwind CSS · ShadCN UI · next-themes

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verify the production build passes
```

---

## Swap placeholder links

Open **`src/content.ts`** - every piece of copy and every URL lives there.

| Field | Where |
|-------|-------|
| `person.github` | GitHub profile URL |
| `person.linkedin` | LinkedIn profile URL |
| `person.resume` | Path to résumé (default `/resume.pdf`) |
| `person.email` | Contact email |

---

## Update the résumé

The site links to `/resume.pdf`, which is `public/resume.pdf` in this repo.

**Without touching code:** on github.com open `public/`, click **Add file → Upload files**,
drop the new PDF named exactly `resume.pdf`, commit to `main`. Vercel redeploys in ~1 min
and the link never changes.

**From a terminal:**

```bash
cp ~/Downloads/Taufik_Khan.pdf public/resume.pdf
git commit -am "Update résumé" && git push
```

---

## Add project media

### Where files go

Put media files in **`/public/media/`**:

```
public/
  media/
    mini-vercel-demo.mp4
    mini-vercel-arch.png
    flow-generator-overview.mp4
    odia-whisper-demo.mov
```

### What to put in the media array

Open `src/content.ts` and edit the `media` array for the relevant project.
**Type is auto-detected - adding or swapping is a one-line edit.**

```ts
// Example: one video + one image + one YouTube link
media: [
  '/media/mini-vercel-demo.mp4',          // .mp4/.webm/.mov → <video>
  '/media/mini-vercel-arch.png',           // .png/.jpg/.gif/.webp → <img>
  'https://youtube.com/watch?v=XXXXXXXXXXX', // youtube.com / youtu.be → iframe
  // 'https://vimeo.com/123456789',        // vimeo.com → iframe
],
```

Leave `media: []` to show the "Walkthrough coming soon" fallback.

### Export settings for screen recordings

| Setting | Recommendation |
|---------|---------------|
| Format | MP4, H.264 |
| Resolution | 1920×1080 (1080p) |
| File size | Keep under ~20 MB per clip - prefer YouTube/Vimeo links for longer walkthroughs to avoid shipping large files |
| Audio | Mute before export - the player always mutes, no audio plays unprompted |

**Tip:** For long demos (> 2 min) paste a YouTube or Vimeo URL instead of shipping the file. Vercel's free plan has a 100 MB limit per file.

---

## Vercel deployment

Push to `main` and import the repo on [vercel.com](https://vercel.com).
Zero-config: Vercel auto-detects Next.js. No environment variables required.

---

## Design tokens

All colors, radii, and spacing are CSS custom properties in `src/app/globals.css`.
Light and dark values are set there; `tailwind.config.ts` maps them to utility classes.
