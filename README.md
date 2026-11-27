# Lore

A glowing world map of legends, monsters and spirits, from Hungary's Turul and the revenant
of Bohemia to the bunyip, the kitsune and La Llorona, with a timeline of when each was first
written down, and Claude as your storyteller.

- **Open the website:** https://sisyphus22.github.io/lore/
- **Download for Windows, Mac or Linux:** https://github.com/Sisyphus22/lore/releases/latest

© 2026 Valeria · All rights reserved · Made with Claude. See [LICENSE](LICENSE).

## Features

- 172 legends on a world map, with filters (including **Scary ones**) and search
- A timeline of when each legend was first recorded, from about 4000 BCE to 1995
- For every legend: culture, place, earliest record, the story in brief and a *Did you know?*
- **Tell me the legend** (spooky, for children, like an old bard, or the scholar's version),
  **Where did it come from?** and **Ask the storyteller**, read aloud
- Respect notes for legends that belong to living cultures and faiths
- Legends told in the Lore TV series (2017) link to the episode and to the podcast. The desktop app can
  also play your own copies of the episodes from a folder on your computer; they are never uploaded.
- Legends from the Lore TV series (2017) link to the episode and the podcast; the desktop app can play your own copies of the episodes from your computer (they are never uploaded)

Storytelling uses each person's own Anthropic API key (**Connect Claude**, bottom right).

## About this project folder

- `lore.html` – the page, shared by the website, the desktop app and the claude.ai version
- `data/legends.json` – the legends; `data/land-110m.json` – the world map (Natural Earth)
- `img/icon.png` – the icon; `vendor/` – bundled d3 and topojson for offline use
- `desktop/` – the desktop app (Electron); `tools/` – the website build and its Claude backend
- `docs/` – the built website served by GitHub Pages

Build the website: `node tools/build-site.js https://github.com/Sisyphus22/lore/releases/latest`

Desktop app (needs Node.js), in `desktop/`: `npm install`, then `npm start` or `npm run dist`.
Pushing a `v*` tag makes GitHub build the Windows, Mac and Linux installers.
