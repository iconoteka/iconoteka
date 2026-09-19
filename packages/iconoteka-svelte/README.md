# iconoteka-svelte

[Iconoteka](https://iconoteka.com) icons as Svelte components — 1,300
icons, seven weights, stroke and fill.

```bash
npm install iconoteka-svelte
```

```svelte
<script>
  import { Bell } from "iconoteka-svelte";
</script>

<Bell />
<Bell weight="bold" variant="fill" size={32} />
```

## Props

| prop | type | default | |
|---|---|---|---|
| `weight` | `thin` · `ultralight` · `light` · `regular` · `medium` · `semibold` · `bold` | `regular` | stroke thickness |
| `variant` | `stroke` · `fill` | `stroke` | outline or solid |
| `size` | number · string | `24` | width and height |

Where an icon's solid form is the same at every weight it's stored once and
served for all of them. Where an icon has no solid form, the stroke renders.

Anything else is spread onto the `<svg>`. Icons paint with
`fill="currentColor"`, so they inherit the surrounding text colour.

Every icon is its own module, so bundlers drop the ones you don't import.

## Names

Each icon exports under its own name, plus any keyword that belongs to it
alone — so `Settings` reaches the gear, `Close` the cross, and
`Notification` the bell. Both names import the same module, so using either
costs the same.

Keywords shared by several icons stay search-only: `delete` belongs to eight
icons, so there is no `Delete` component. Search for those on
[iconoteka.com](https://iconoteka.com) and use the name it shows.

Named `variant` rather than `style` because `style` collides with the
reserved DOM prop. Icons whose name starts with a digit are prefixed with
`Icon` — `3dscan` becomes `Icon3dScan` — since identifiers can't start
with a number.

## Support

Iconoteka is a free, open-source library created and maintained by one person.
Support its future development through a monthly
[Patreon](https://www.patreon.com/c/iconoteka) subscription or a one-time
[Ko-fi](https://ko-fi.com/iconoteka) donation.

MIT © Oleg Turbaba
