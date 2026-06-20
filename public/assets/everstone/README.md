# Everstone image library

Curated on 20 June 2026 for the three homepage visual sets already present in the application. No image in this folder is imported by the site yet.

The library currently contains 99 source images: 90 licensed Pexels photographs and nine original Still Light artworks generated for Everstone with OpenAI ImageGen. This includes the initial collection, the red-mark-guided alternates and five additional nine-image themes.

## Contents

- `themes/heritage-studio/` — family albums, archival photographs, tactile keepsakes and a discreet bronze memorial detail.
- `themes/coastal-archive/` — mist, horizon, coastal paths, weathered stone and subdued sea light.
- `themes/quiet-garden/` — dappled paths, moss, sheltered garden spaces and candlelight.
- `themes/keepsake/` — photographs held in the hand, handwritten notes, familiar chairs, records and quietly personal objects.
- `themes/open-country/` — eucalyptus, wide skies, rural roads, open fields and distinctly Australian landscape character.
- `themes/mountain-mist/` — ridgelines, valleys, winding trails and land receding softly into cloud.
- `themes/starlight/` — moonlit water, subdued twilight and restrained night-sky landscapes.
- `themes/still-light/` — bespoke abstract artworks using alabaster, charcoal stone, water, translucent layers and muted bronze light.
- `themes/*/alternates/round-2/` — nine additional options per theme, emphasizing tactile archives, soft coastal fog, minimal horizons, inviting garden paths, green archways and moss in warm light.
- `ui/` — reusable icons, dividers, number and bullet markers, repeatable patterns, CC0 material textures, licences and sensitive-use guidance.
- `contact-sheets/` — review boards only; these are not intended as production assets.
- `assets.json` — source, photographer, licence, query, dimensions, checksum, intended slot and opacity guidance for every selected photograph.

Each theme contains one selected image for `hero`, `plate`, `memorial-cover`, `archive` and `ambience`, plus four images in `gallery/`.

The existing images outlined in red by the user are recorded in `assets.json` with `userPreference: "red-marked-favourite"`. Round 2 images are recorded with `collection: "round-2"` and `status: "alternate"`.

## Usage guidance

- Hero, plate, memorial-cover and gallery photographs are intended to remain at full image opacity.
- Archive photographs are intended at approximately 85% image opacity with a subtle warm overlay.
- Ambience photographs are intended at approximately 28% image opacity beneath a roughly 72% dark overlay.
- Preserve the original files in this library. Create WebP/AVIF derivatives during the later implementation pass rather than replacing these source JPGs.

Selected photographic originals are sourced from Pexels and recorded under the Pexels Licence. Still Light images are recorded as original OpenAI ImageGen assets with their prompts and applicable OpenAI terms. Check `assets.json` before use for the full source record.
