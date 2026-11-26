# The World in One Day — Thursday 26 November 2026

A make.fun news-image entry: one image that sums up the world's news of
Thursday 26 November 2026. The program copies the pre-rendered broadsheet
to `/output/entry.png`; it runs twice and writes the same bytes both times.

## The image

- **37 verified stories** across 10 regions, each with its source named
- **3 lead stories**: the Houthi strike on Aramco's Jazan refinery, Russian
  missiles hitting a Kyiv shopping centre, and the EU summit deadlocked
  over the €1.58tn budget and a €45bn Ukraine loan
- **DATE CHECK box**: every story happened, or was first reported, on
  Thursday 26 November 2026 — no story from any other day
- **Timeline 00:00–23:59 UTC** and a region count strip
- **768 × 1024 PNG, 603,167 bytes** — inside the 1 MiB / 1024×1024 gate

## Files

- `entry.png` — the submitted image
- `broadsheet.html` — the broadsheet source (HTML/CSS + inline SVG art),
  written fresh for this edition; no AI image generator was used for text
- `render.mjs` — renders the broadsheet at 2400×3200 with Playwright and
  downscales it to 768×1024 with Pillow
- `main.ts` — the entry program (Node 22, standard library only)

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
