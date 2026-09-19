# Iconoteka

A universal, open-source library of precisely designed pictograms.

[Website](https://iconoteka.com) · [Figma Plugin](https://www.figma.com/community/plugin/1675995752572535073/iconoteka) · [License](LICENSE)

| | |
|---|---|
| **1300** icons | from rapid prototyping to real-world wayfinding systems |
| **7** weights | Thin, Ultralight, Light, Regular, Medium, Semibold, Bold |
| **2** styles | stroke and fill |
| **14970** shapes | complete coverage for almost any use case |
| **23** categories | Arrows, Interface, Hardware, Nature, Transportation, … |

## Adding icons to your project

Take the icons you need — there's no need to install or clone the whole
library.

**In Figma** — install the
[plugin](https://www.figma.com/community/plugin/1675995752572535073/iconoteka),
search, drag the icon onto the canvas.

**One icon at a time** — every icon is a standalone SVG on the CDN:

```
https://cdn.jsdelivr.net/gh/iconoteka/iconoteka@02.00.15/Icons/Interface/bell-notification-notify-reminder-ring-sound-r-s.svg
```

The path is `Icons/{Category}/{name}-{weight}-{style}.svg`, where weight is one
of `t` `u` `l` `r` `m` `s` `b` (thin → bold) and style is `s` for stroke or `f`
for fill. Categories with spaces need URL-encoding: `Files%20%26%20Data`.

**Inline in your markup** — both styles are outlined paths, so an icon is a
single `<path>` with no stroke attributes. Every SVG ships with
`fill="currentColor"`, so it inherits the surrounding text colour:

```html
<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M3 15.55C4.675 13.225 5 11.45 5 8.5…" fill="currentColor"/>
</svg>
```

Swap the weight or style by changing one letter in the filename — the geometry
is designed to stay optically balanced across all seven weights.

## Framework packages

Icons as components, generated from the same SVGs:

```bash
npm install iconoteka-react    # or iconoteka-vue, iconoteka-svelte
```

```jsx
import { Bell } from "iconoteka-react";

<Bell />
<Bell weight="bold" variant="fill" size={32} />
```

`weight` takes any of the seven, `variant` is `stroke` or `fill`, and anything
else is spread onto the `<svg>`. Each icon is its own module, so bundlers drop
what you don't import.

## Using the full set

`icons.json` carries every icon and variant in one file — useful for bundling
the set into a design system, generating components, or pulling icons at build
time.

```bash
npm install iconoteka
```

```js
import icons from "iconoteka" with { type: "json" };  // ESM
const icons = require("iconoteka");                   // CommonJS
```

Or fetch it from the CDN:

```
https://cdn.jsdelivr.net/gh/iconoteka/iconoteka@02.00.15/icons.json
```

Pin the tag rather than `@main` — jsDelivr caches branch URLs for up to 7 days.
The npm package contains `icons.json` only; the raw SVGs stay in the repo.

```json
{
  "meta": {
    "version": "02.00.09",
    "count": 1300,
    "categories": 23,
    "popular": ["ai", "alert", "bank_card", "bell", "…"]
  },
  "icons": [
    {
      "name": "leaf-ecology-nature-natural-leaves-eco-green-organic-plant-wind",
      "displayName": "Leaf",
      "searchTerms": ["leaf", "ecology", "nature", "natural", "leaves"],
      "category": "Nature",
      "variants": { "regular": { "stroke": "M12 2.5…", "fill": "M12 2.5…" } }
    }
  ]
}
```

The first segment of `name` is the icon's identity; the rest are search-only
aliases, so match on the identity rather than the full string. Weights are
keyed `thin`, `ultralight`, `light`, `regular`, `medium`, `semibold`, `bold`,
each holding a `stroke` and/or `fill` path.

A curated selection carries `"popular": true`, listed by identity in
`meta.popular`. Popular is a flag, not a category — no icon is stored twice.

## Design

**24-point grid** — every icon is built on a 24px grid, so straight lines stay
crisp at 24, 48, 96px and beyond, and the set sits comfortably alongside other
popular libraries.

**Advanced optics** — deliberate overshoots, density-based weight modularity
and optical stroke compensation throughout.

**Bracketing system** — preserves structural integrity across all seven
weights. Unlike stroke-based sets that simply scale outlines, legibility and
visual balance hold at both extremes.

**System architecture** — a structured metaphor hierarchy, a 5° geometric angle
rule, tiered corner rounding and modular components keep the library
consistent at production scale.

**Universality** — geometric construction and high visual clarity keep the
icons legible across products and industries that demand contrast and
structural consistency.

## Support

Iconoteka is a free, open-source library created and maintained by one person.
Support its future development through a monthly
[Patreon](https://www.patreon.com/c/iconoteka) subscription or a one-time
[Ko-fi](https://ko-fi.com/iconoteka) donation.

## License

MIT — see [LICENSE](LICENSE). Free for personal and commercial use, including
in closed-source products. No permission needed, no fee. Credit isn't
required, though it's always appreciated.

## Author

Built by [Oleg Turbaba](https://turbaba.com), Brand Design Director at
[Clay Global](https://clay.global) — a multidisciplinary designer working at
the intersection of brand identity, digital products and visual experiences.

For enquiries, collaborations, interviews or sponsorships:
[olegturbaba@gmail.com](mailto:olegturbaba@gmail.com)

[Instagram](https://www.instagram.com/turbaba/) ·
[LinkedIn](https://www.linkedin.com/in/oleg-turbaba-35438828/) ·
[Behance](https://www.behance.net/turbaba)

Sharing your work? Mention [@iconoteka](https://www.instagram.com/iconoteka/)
on Instagram, LinkedIn or [X](https://x.com/iconoteka).
