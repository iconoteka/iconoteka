# Changelog

Library versions use the `02.00.08` form.

## 02.01.00 · Wrappers 0.4.0 · MCP 0.2.3 — 10 Oct 2026

- **100 new icons, taking the library to 1,400** and 16,123 shapes. The middle
  number moves because the set grew. By category: Interface 63, Files & Data
  11, Map 6, Arrows 5, Communications 5, People 3, Finance 2, Shapes 2, and one
  each in House, Nature and Objects.
  - Version control, as a family: `git_branch`, `git_commit`,
    `git_commit_vertical`, `git_merge`, `git_fork`, `git_fork_right`,
    `git_pull_request`, `git_compare`.
  - Lists, as a family: `list_tree`, `list_lock`, `list_settings`,
    `list_heart`, `list_music`, `list_search`, `list_user`, `list_video`, and
    the six `list_type_*` forms alongside `list_type_numbered` and
    `list_type_letters`.
  - Progress and speed: seven `loader_*` steps from 13 to 88 per cent, and
    four `speedometer_*` levels.
  - Boolean operations and mirrors: `union`, `subtract`, `intersect`,
    `exclude`, `base_shapes`, `flip_horizontal`, `flip_vertical`,
    `mirror_vertical`, `mirror_horizontal`, `mirror_both`, `mirror_triangle`,
    `mirror_six`, `mirror_eight`.
  - Books and images, completing the add/remove/off sets: `books`,
    `book_plus`, `book_minus`, `book_x`, `image_plus`, `image_minus`,
    `image_off`, `doc_stack`, `scroll`, `quotation_marks`, `passport`.
  - Messages and mail: `message_add`, `message_minus`, `message_check`,
    `message_question`, `mail_x`, plus `user_check` and `user_x`.
  - Tickets and places: `ticket_plus`, `ticket_minus`, `ticket_check`,
    `apartment`, `shop`, `house_building`.
  - And the singles: `mcp`, `handshake`, `sitemap`, `sparkles`, `grid_3x3`,
    `bell_ring`, `broadcast`, `security_alert`, `lifebuoy`, `target`,
    `cursor_arrow`, `cursor_click`, `container_code`, `container_cluster`,
    `pen_line`, `eraser`, `knife`, `coins`, `calculator`, `fan`, `unpin`,
    `spade`, `club`, `poop`, and the three `split_*` and two
    `maximize_diagonal*` arrows.
- **Two icons redrawn.** `opacity` ships as seven strokes and no fill at all,
  where it used to carry a fill in every weight. `house` keeps one fill for all
  seven weights instead of seven near-identical copies.
- **100 keywords added across 64 existing icons**, none removed, so nothing
  that resolved before stops resolving. `chevron_right` answers `chevron`,
  `fold` answers `unfold_less`, `repeat` answers `recurring`, `calendar`
  answers `weekday`, `message_alert` answers `complaint`, and so on. Filenames
  equal frame names, so this renamed 743 SVGs — the CDN paths for those icons
  change with it.
- **`new` is published with the data, for the website to mark.** `meta.new`
  lists the 100 identities, `meta.tags` labels the tag, and each of those icons
  carries `tags: ["new"]`. It is computed by `npm run build` from the
  `icons.json` it replaces, never typed into a frame name — a tag in a name
  would rename 14 SVGs and have to come back out next release. It means "added
  in this version", so it needs no clock and the published file says the same
  thing forever; rebuilding 02.01.00 keeps the list, and the next version
  recomputes it.
- **`download_folder` and `upload_folder` get the keywords they already had in
  Figma.** They shipped in 02.00.15 carrying only their own name, while their
  Figma frames carried eight words each — `folder_download`,
  `download_to_folder`, `export_folder`, `export`, `retrieve`, `get`, `pull`
  and the matching `folder_upload`, `upload_to_folder`, `import_folder`,
  `import`, `push`, `submit`, `dropzone`. Figma is the authority for a frame
  name, so the repo follows it: 28 more SVGs renamed, and those two icons are
  now searchable by all eight words. All 1,400 filenames now equal their frame
  names exactly.
- **`shop` is no longer an alias.** It resolved to `shopping_bag`; now it is an
  icon's own name, and an identity always wins. 193 resolutions, down from 194.
- Wrappers go to 0.4.0 with the 100 new components, and take their advertised
  icon count from the data so a release cannot leave a stale number behind.
  MCP goes to 0.2.3 and requires `iconoteka ^2.1.0`.

## MCP 0.2.2 — 15 Sep 2026

- **Existing installs now get current icons.** `npx` upgrades iconoteka-mcp
  inside the folder it already has, but keeps a dependency while it still
  satisfies the declared range. With `iconoteka: ^2.0.12`, anyone who had
  installed earlier received the new server with 02.00.12 data: 1 298 icons,
  `delete` answering `garbage`, and no `upload_folder` or `download_folder`.
  The server now requires `^2.0.15`, which forces the data to move with it.
- `npm run build` now keeps that requirement equal to the data version on
  every release and warns that a new iconoteka-mcp must be published too, so
  the gap cannot reopen.

## MCP 0.2.1 — 13 Sep 2026

- Package description, README and registry listing now say 1 300 icons.
  0.2.0 was published before 02.00.15 and still advertised 1 298. No code
  change — the server always reported the live count from the data.
- Setup instructions for every major client, not just Claude: Codex,
  VS Code (GitHub Copilot), Cursor, Claude Desktop, Windsurf, Gemini CLI and
  Zed, each in its own format. The old shared block was wrong for Zed, which
  reads `context_servers`, and for VS Code, which reads `servers`.
- The Tools section documents `get_icon` taking a list, and word lookups
  like `edit` → `pen`; its example output now matches what the server
  actually returns. Dropped the claim that results match iconoteka.com —
  the site still runs older data.

## 02.00.15 — 10 Sep 2026

- Two new icons, taking the library to **1 300**: `upload_folder` and
  `download_folder`, both in Files & Data, all 7 weights in stroke and fill —
  14 970 shapes in total. They join the existing folder family (`folder_add`,
  `folder_opened`, `folder_shared`, …).
- Named with an underscore rather than as `upload`/`download`, because
  `download` is already the identity of the Arrows icon
  `download-get_app-bottom-get-fetch-bar`, and an identity has to be unique —
  it becomes the component name and the lookup key. `download` still resolves
  to the arrow, as before.
- Wrappers go to 0.3.1 with `<UploadFolder/>` and `<DownloadFolder/>`.

## Wrappers 0.3.0 · MCP 0.2.0 — 9 Sep 2026

No icon data changed, so the library stays at 02.00.14 and there is no
tag for this release — the wrappers and the MCP version independently.

- **React refs work again.** Icons were plain function components, so before
  React 19 a `ref` was silently dropped and React warned "Function components
  cannot be given refs" — while the types accepted it happily. Every icon is
  wrapped in `forwardRef` now and carries a `displayName`. Verified against a
  real DOM on React 18: `ref.current` is the `<svg>`.
- **Svelte works in runes mode.** The components used `export let` and
  `$$restProps`, which throws "Cannot use $$restProps in runes mode", so any
  project with `compilerOptions.runes = true` could not use them at all. They
  use `$props()` and `$derived` now. This needs Svelte 5, so the peer range
  moves from `>=4` to `>=5` — the one breaking change here.
- **`get_icon` takes a list.** Pass `["bell", "trash", "pen"]` to fetch up to
  24 icons in one call instead of one request each. A single name behaves
  exactly as before, and an unknown name inside a list still returns its own
  "did you mean" line rather than failing the batch.
- Each package's `index.d.ts` now declares one `IconComponent` alias instead
  of repeating the full type on all 4512 lines.

## 02.00.14 — 9 Sep 2026

Packaging and typing fixes found by a full functional test of the wrappers
and the MCP server. No icon data changed. Wrappers go to 0.2.0 — the type
changes can surface errors in a project that compiles today.

- The Vue and Svelte type files began `import type { SVGProps } from "react"`.
  One shared template generated all three, so a Vue or Svelte project without
  React installed could not resolve its own icon types at all. Types are now
  generated per framework.
- React components were typed `(props) => JSX.Element`. React 19 removed the
  global `JSX` namespace, so that failed to resolve under `@types/react` 19.
  They are typed `ReactElement` now, which resolves on React 17 through 19.
- `IconProps` excluded `style`, so TypeScript rejected an inline style that
  worked perfectly at runtime. The exclusion served no purpose and is gone.
- `index.d.ts` declared `__icons`, which no package exported — TypeScript
  accepted it and the runtime returned undefined. The declaration is removed.
- Every package now exposes `./package.json` through its `exports` map, so
  tooling that reads a dependency's version no longer hits
  ERR_PACKAGE_PATH_NOT_EXPORTED.
- Vue and Svelte components were typed `any`, so an editor offered nothing
  when you typed `weight="`. Seven weights is the reason to reach for this
  library, and it was invisible to two of the three wrapper audiences. Vue
  components are `DefineComponent<IconProps>` now and Svelte components are
  `ComponentType<SvelteComponent<IconProps>>` — both names exist in Svelte 4
  and 5, so the `>=3` and `>=4` peer ranges are unchanged. Any other
  attribute still passes through to the `<svg>`, as it does at runtime.

## 02.00.13 — 9 Sep 2026

- `garbage` is now `trash`. The bin icon's identity, filename, display name and
  component all use the word people actually reach for; `garbage` stays as a
  search alias, so nothing that worked before stops working. Renamed on both
  Figma pages too, so the next export keeps it.
- Three words were answering with the wrong icon and now don't: `file` and
  `document` reached an empty checkbox and a sheet of paper respectively, and
  now reach `doc_text`; `battery` reached `battery_charging` and now reaches
  `battery_full`.
- `play` keeps answering with `triangle_right`, now recorded explicitly rather
  than by luck of being its only claimant. A play button is a right-pointing
  triangle, and that icon already carries `play`, `start` and `next`.

## 02.00.12 — 9 Sep 2026

- Icons now answer to the words developers actually type. `icons.json` carries
  a new `meta.aliasResolutions` table: 191 words mapped to the one icon that
  should answer them, so `trash` reaches `garbage` and `edit` reaches `pen`.
  Most were settled by resolving both sides to the same source glyph; seven
  contested ones by hand.
- The React, Vue and Svelte packages export those 191 words as components —
  `<Edit/>`, `<Deploy/>`, `<Terminal/>` — 3 213 alias exports in all. Each is
  the same module as the icon it names, so it adds nothing to a bundle.
- The MCP server resolves settled words directly, and ranks them above every
  other claimant in search. A word can now point at an icon that never carried
  it as a keyword.

## 02.00.11 — 9 Sep 2026

- Published to npm without a git tag, so the `meta.cdn` URL inside it points at
  a tag that does not exist. Use 02.00.12.

## 02.00.10 — 8 Sep 2026

- Restored the `morda` keyword on `face_big_smile`. It was removed in 02.00.06
  as an unrecognised token; it's deliberate and personal, like `dasha`, `dida`
  and `dora` on the heart.

## 02.00.09 — 7 Sep 2026

- Removed the white background rectangle from every SVG. It was a Figma export
  artifact — 15 286 of them across 14 942 files — and put a white box behind
  the icon on any non-white background.
- Paths now ship `fill="currentColor"` instead of `fill="black"`, so an icon
  inherits the surrounding text colour. Matches how Heroicons, Phosphor and
  Material Symbols ship.

`icons.json` is unaffected: the build only ever extracted the `<path>` data.

## 02.00.08 — 7 Sep 2026

- `meta.popular` lists the curated selection by icon identity, so consumers get
  it from `icons.json` alone — `scripts/popular.json` is repo-only.
- `meta.categories` added.

## 02.00.07 — 7 Sep 2026

- **"Popular" is no longer a category.** It was a duplicate of 38 icons that
  already live in other categories — 428 duplicated SVGs, and every consumer
  iterating `icons` got those 38 twice.
- Those icons now carry `"popular": true` on their real entry. The curated
  selection lives in `scripts/popular.json`, keyed by icon identity.
- `icons.json` is 1 298 entries (the Popular duplicates are no longer double-counted) and 14 942
  shapes, matching the published figures.
- `meta.cdn` now pins the release tag instead of `@main`, which jsDelivr
  caches for up to 7 days.

**Migration:** anything filtering `category === "Popular"` should read the
`popular` flag instead. Category lists drop from 24 to 23.

## 02.00.06 — 5 Sep 2026

- Fixed malformed search keywords across the library: `flowe` → `flower`,
  `gamedie` → `game_die`, `nofly` → `no_fly`, `wayout` → `way_out`,
  `firstaid` → `first_aid`, `halfmoon` → `half_moon`, `tincan` → `tin_can`,
  `number1` → `number_1`, `type7` → `type_7`, `leafs` → `leaves`
- Removed truncated and non-word keywords: `slider_hor`, `sliders_hor`,
  `foreverness`, `arrow_in_circled`, `homeplant`
- Added UK spelling variants as search-only aliases, with US spelling still
  primary: `colour`, `colours`, `colourful`, `centre`, `centred`, `catalogue`,
  `dialogue`, `favourite`, `defence`, `organise`, `organisation`,
  `jewellery`, `harbour`, `aeroplane`, `programme`
- 542 SVGs renamed, `icons.json` rebuilt

## 02.00.05 — 3 Sep 2026

- Reverted `displayName` formatting to the previous behaviour

## 02.00.04 — 2 Sep 2026

- Fixed the cloud family weight progression — broken ultralight masters meant
  the ultralight and thin weights were near-identical
- Naming cleanup across 24 keyword defects
- Real display names in `icons.json`

## 02.00.00 — Sep 2026

Version 2 release. Fully reworked icon library — 1 298 icons, 7 weights in 2
styles, new website, Figma plugin, MIT license, GitHub repository.

## Earlier

| Date | Version | Icons | Weights | |
|---|---|---|---|---|
| 26 Aug 2026 | | 1 298 | 7 weights, 2 styles | Every icon redrawn from scratch as clean vectors |
| 15 Mar 2021 | 1.0.2 | 1 040 | 4 weights, 2 styles | Updated icons |
| 17 Jun 2019 | 1.0.1 | 388 | 4 weights, 2 styles | iconoteka.com launched |
| 14 Jun 2019 | | 388 | 4 weights, 2 styles | Public beta released |
| 9 Mar 2019 | 1.0.0 | 237 | 4 weights, 2 styles | Global rework, revisions, Sport and Nature added |
| 28 Jul 2018 | 0.2.0 | 716 | 4 weights, 2 styles | Bold stroke and fill, rework |
| 3 Jun 2018 | 0.1.4 | 715 | 4 weights, 2 styles | Bold stroke and fill styles |
| 24 Apr 2018 | 0.1.3 | 309 | 2 weights | New categories added |
| 4 Mar 2018 | 0.1.2 | 227 | 2 weights | All icons categorised |
| 3 Mar 2018 | 0.1.1 | 226 | 2 weights | First public version |
| 20 Sep 2017 | | 13 | | Started the project |
| 24 May 2016 | | 3 | | Idea was born |
