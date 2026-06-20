# Everstone reusable UI asset kit

This folder is a source library only. Nothing here is imported into the website yet.

The kit is intentionally restrained for a memorial product: functional symbols stay neutral and legible, while emotional or spiritual motifs remain optional rather than becoming assumptions about a family, relationship, culture or belief.

## Contents

- `icons/lucide/functional/` — 20 workflow, navigation, trust and sharing icons.
- `icons/lucide/thematic/` — 19 optional memory, landscape and remembrance motifs.
- `dividers/` — six quiet horizontal dividers composed from Lucide artwork.
- `markers/numbers/` — six numbered step markers from `01` to `06`.
- `markers/bullets/` — seven neutral or theme-aware bullet markers.
- `patterns/hero-patterns/` — six repeatable SVG background tiles.
- `textures/ambientcg-cc0/` — three 1K colour textures: paper, soft knit and warm fine stone.
- `licenses/` — local copies of the applicable ISC, MIT and CC0 licence texts.
- `assets.json` — provenance, version, licence, intended use, cautions, checksums and local paths.

## Recommended use

- QR and plaque education: `scan-qr-code`, `qr-code`, `scan-line`, `stone`.
- Memorial creation: `pen-line`, `images`, `calendar-days`, `message-circle`, `book-open-text`.
- Trust and privacy: `shield-check`, `lock-keyhole`, `user-round-check`.
- Sharing and local support: `share-2`, `link-2`, `map-pin`, `external-link`.
- Theme choices: `album`, `armchair`, `leaf`, `waves`, `mountain-snow`, `stars`, `sunrise`, `trees`.
- Remembrance actions: prefer neutral `sparkles`, `leaf`, `star` or `ripple` motifs; use `flame` and `flower-2` only where the family has chosen that language.
- Number markers: use for ordered journeys such as plaque → memorial → preview. Keep the real step number available to assistive technology.
- Dividers: one between major narrative sections is usually enough. They should create a breath, not become decoration between every card.
- Patterns: approximately 3–8% visible opacity behind short sections or cards. Avoid high-contrast patterning behind body text.
- Surface textures: approximately 2–8% visible opacity. Create optimized derivatives during implementation and retain these files as sources.

## Sensitive-design guardrails

- Do not use hearts to imply a relationship, flames to imply a ritual, stars to imply an afterlife, or flowers to imply a gender unless the family has selected that expression.
- Pair ambiguous icons with visible labels. Icons should support comprehension, not replace compassionate language.
- Avoid skulls, angels, wings, crosses, praying hands, tombstones and generic grief silhouettes as defaults.
- Use animation sparingly and respect reduced-motion preferences. Remembrance UI should never pulse, demand attention or manufacture urgency.
- Keep decorative imagery away from primary actions such as ordering, privacy controls and publishing.

## Sources

- Lucide Static `1.21.0`, ISC licence: https://lucide.dev/license
- Hero Patterns `2.1.0`, MIT licence: https://github.com/lowmess/hero-patterns/blob/master/LICENSE
- ambientCG `Paper001`, `Fabric019` and `Concrete040`, CC0: https://docs.ambientcg.com/license/

Firecrawl was used only to locate and verify official source and licence pages. The API key is not copied into this library or its metadata.
