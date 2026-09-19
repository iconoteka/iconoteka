#!/usr/bin/env node

/**
 * Generates the framework wrapper packages from icons.json.
 *
 *   packages/iconoteka-react/    React    (createElement, no JSX build step)
 *   packages/iconoteka-vue/      Vue 3    (render fn, no SFC build step)
 *   packages/iconoteka-svelte/   Svelte   (.svelte source, as Svelte libs ship)
 *
 * One file per icon so bundlers can tree-shake — importing Bell must not pull
 * in the other 1297. Each file carries all 7 weights x 2 styles (~5.7 kB), so
 * switching weight is a prop, not a different import.
 *
 * Run:  node scripts/build-wrappers.js
 */

const fs   = require("fs");
const path = require("path");

const ROOT     = path.join(__dirname, "..");
const DATA     = require(path.join(ROOT, "icons.json"));
const PKG      = require(path.join(ROOT, "packages/iconoteka/package.json"));
const VERSION  = PKG.version;
const WRAPPER_VERSION = "0.3.1";  // wrappers version independently of the data

const WEIGHTS = ["thin","ultralight","light","regular","medium","semibold","bold"];

// ── Naming ────────────────────────────────────────────────────────────────────

/** bank_card -> BankCard ; 3dscan -> Icon3dScan (identifiers can't start with a digit) */
function componentName(identity) {
  const pascal = identity
    .split("_")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return /^[0-9]/.test(pascal) ? "Icon" + pascal : pascal;
}

/**
 * A solid form usually doesn't change with stroke weight, so those icons store
 * one fill rather than seven identical copies. Returns the weight key holding
 * that shared fill, or null when the fill genuinely varies per weight.
 */
function sharedFillWeight(icon) {
  const withFill = WEIGHTS.filter(w => icon.variants[w] && icon.variants[w].fill);
  if (!withFill.length) return null;
  const weights = WEIGHTS.filter(w => icon.variants[w]);
  return withFill.length < weights.length ? withFill[0] : null;
}

function variantData(icon) {
  const out = {};
  for (const w of WEIGHTS) {
    const v = icon.variants[w];
    if (!v) continue;
    const entry = {};
    if (v.stroke) entry.stroke = v.stroke;
    if (v.fill)   entry.fill   = v.fill;
    if (Object.keys(entry).length) out[w] = entry;
  }
  return out;
}

// ── Emitters ──────────────────────────────────────────────────────────────────

// forwardRef, not a bare function: before React 19 a function component never
// receives `ref` in props, so a ref passed to an icon was silently dropped and
// React warned. forwardRef behaves identically on 17 through 19.
const react = (name, paths, shared) => `import { createElement, forwardRef } from "react";

const p = ${JSON.stringify(paths)};
const f = ${shared ? `p.${shared}.fill` : "null"};

const ${name} = forwardRef(function ${name}(
  { weight = "regular", variant = "stroke", size = 24, ...rest }, ref
) {
  const w = p[weight] || p.regular;
  const d = w[variant] || (variant === "fill" ? f : null) || w.stroke;
  return createElement(
    "svg",
    { ref, width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      xmlns: "http://www.w3.org/2000/svg", ...rest },
    createElement("path", { d, fill: "currentColor" })
  );
});

${name}.displayName = ${JSON.stringify(name)};

export default ${name};
`;

const vue = (name, paths, shared) => `import { h } from "vue";

const p = ${JSON.stringify(paths)};
const f = ${shared ? `p.${shared}.fill` : "null"};

export default {
  name: ${JSON.stringify(name)},
  props: {
    weight:  { type: String, default: "regular" },
    variant: { type: String, default: "stroke" },
    size:    { type: [Number, String], default: 24 }
  },
  setup(props, { attrs }) {
    return () => {
      const w = p[props.weight] || p.regular;
      const d = w[props.variant] || (props.variant === "fill" ? f : null) || w.stroke;
      return h(
        "svg",
        { width: props.size, height: props.size, viewBox: "0 0 24 24",
          fill: "none", xmlns: "http://www.w3.org/2000/svg", ...attrs },
        [h("path", { d, fill: "currentColor" })]
      );
    };
  }
};
`;

// Runes, not `export let` + `$$restProps`. The legacy form throws
// "Cannot use $$restProps in runes mode", so any project with
// compilerOptions.runes = true could not use the icons at all. This form
// requires Svelte 5, which the peer range now states.
const svelte = (name, paths, shared) => `<script>
  let { weight = "regular", variant = "stroke", size = 24, ...rest } = $props();

  const p = ${JSON.stringify(paths)};
  const f = ${shared ? `p.${shared}.fill` : "null"};

  const w = $derived(p[weight] || p.regular);
  const d = $derived(w[variant] || (variant === "fill" ? f : null) || w.stroke);
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg" {...rest}>
  <path d={d} fill="currentColor" />
</svg>
`;

// ── Package scaffolding ───────────────────────────────────────────────────────

// Types are per framework. A shared template used to emit `import ... from
// "react"` into every package, so a Vue or Svelte project with no React
// installed could not resolve its own icon types.
const SHARED_TYPES = `export type IconWeight =
  | "thin" | "ultralight" | "light" | "regular"
  | "medium" | "semibold" | "bold";

export type IconVariant = "stroke" | "fill";
`;

const OWN_PROPS = `  /** Stroke thickness. Default "regular". */
  weight?: IconWeight;
  /** Outline or solid. Default "stroke". */
  variant?: IconVariant;
  /** Width and height in px. Default 24. */
  size?: number | string;`;

// React can extend the real SVG prop type. Everything not named above is
// spread onto the <svg>, so the full SVG surface is genuinely accepted —
// including `style`, which an earlier Omit wrongly rejected.
const TYPES_BY_LABEL = {
  React: `import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

${SHARED_TYPES}
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "ref"> {
${OWN_PROPS}
}

/** Every icon: accepts the SVG props plus a ref to the <svg> element. */
export type IconComponent =
  ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
`,
  // Vue and Svelte keep the index signature so any attribute still passes
  // through to the <svg>, exactly as it does at runtime. The named props are
  // typed so an editor can offer the seven weights — the whole point.
  Vue: `import type { DefineComponent } from "vue";

${SHARED_TYPES}
export interface IconProps {
${OWN_PROPS}
  /** Any other attribute is forwarded to the <svg> element. */
  [attr: string]: unknown;
}

/** Every icon. */
export type IconComponent = DefineComponent<IconProps>;
`,
  // ComponentType<SvelteComponent<P>> is the CONSTRUCTOR type, which is what
  // the package exports; bare SvelteComponent<P> is an instance. Both names
  // exist in Svelte 4 and 5, so the >=4 peer range is untouched. Svelte 5's
  // `Component` would have been cleaner but does not exist in 4.
  Svelte: `import type { Component } from "svelte";

${SHARED_TYPES}
export interface IconProps {
${OWN_PROPS}
  /** Any other attribute is forwarded to the <svg> element. */
  [attr: string]: unknown;
}

/** Every icon. Svelte 5 components are functions, hence Component. */
export type IconComponent = Component<IconProps>;
`,
};

// How a component is declared, per framework.
const DECL_BY_LABEL = { React: "IconComponent", Vue: "IconComponent", Svelte: "IconComponent" };

function manifest(pkgName, extra) {
  return {
    name: pkgName,
    version: WRAPPER_VERSION,
    description: `Iconoteka icons as ${extra.label} components — 1300 icons, 7 weights, stroke and fill`,
    license: "MIT",
    author: "turbaba",
    homepage: "https://iconoteka.com",
    repository: {
      type: "git",
      url: "git+https://github.com/iconoteka/iconoteka.git",
      directory: `packages/${pkgName}`
    },
    keywords: ["icons","iconoteka","svg", extra.label.toLowerCase(), "design-system"],
    type: "module",
    sideEffects: false,
    ...extra.fields,
    files: ["icons", "index.js", "index.d.ts", "README.md", "LICENSE"],
    peerDependencies: extra.peer,
    engines: { node: ">=18" }
  };
}

function readme(pkgName, label, usage) {
  return `# ${pkgName}

[Iconoteka](https://iconoteka.com) icons as ${label} components — 1300
icons, seven weights, stroke and fill.

\`\`\`bash
npm install ${pkgName}
\`\`\`

${usage}

## Props

| prop | type | default | |
|---|---|---|---|
| \`weight\` | \`thin\` · \`ultralight\` · \`light\` · \`regular\` · \`medium\` · \`semibold\` · \`bold\` | \`regular\` | stroke thickness |
| \`variant\` | \`stroke\` · \`fill\` | \`stroke\` | outline or solid |
| \`size\` | number · string | \`24\` | width and height |

Where an icon's solid form is the same at every weight it's stored once and
served for all of them. Where an icon has no solid form, the stroke renders.

Anything else is spread onto the \`<svg>\`. Icons paint with
\`fill="currentColor"\`, so they inherit the surrounding text colour.

Every icon is its own module, so bundlers drop the ones you don't import.

## Names

Each icon exports under its own name, plus any keyword that belongs to it
alone — so \`Settings\` reaches the gear, \`Close\` the cross, and
\`Notification\` the bell. Both names import the same module, so using either
costs the same.

Keywords shared by several icons stay search-only: \`delete\` belongs to eight
icons, so there is no \`Delete\` component. Search for those on
[iconoteka.com](https://iconoteka.com) and use the name it shows.

Named \`variant\` rather than \`style\` because \`style\` collides with the
reserved DOM prop. Icons whose name starts with a digit are prefixed with
\`Icon\` — \`3dscan\` becomes \`Icon3dScan\` — since identifiers can't start
with a number.

## Support

Iconoteka is a free, open-source library created and maintained by one person.
Support its future development through a monthly
[Patreon](https://www.patreon.com/c/iconoteka) subscription or a one-time
[Ko-fi](https://ko-fi.com/iconoteka) donation.

MIT © Oleg Turbaba
`;
}

// ── Build ─────────────────────────────────────────────────────────────────────

const TARGETS = [
  { dir: "iconoteka-react", label: "React", ext: "js", emit: react,
    peer: { react: ">=17" },
    fields: { main: "./index.js", module: "./index.js", types: "./index.d.ts",
              exports: { ".": { types: "./index.d.ts", default: "./index.js" },
                          "./icons/*": "./icons/*",
                          "./package.json": "./package.json" } },
    usage: '```jsx\nimport { Bell, Heart } from "iconoteka-react";\n\n<Bell />\n<Bell weight="bold" variant="fill" size={32} />\n<Heart className="text-red-500" />\n```' },

  { dir: "iconoteka-vue", label: "Vue", ext: "js", emit: vue,
    peer: { vue: ">=3" },
    fields: { main: "./index.js", module: "./index.js", types: "./index.d.ts",
              exports: { ".": { types: "./index.d.ts", default: "./index.js" },
                          "./icons/*": "./icons/*",
                          "./package.json": "./package.json" } },
    usage: '```vue\n<script setup>\nimport { Bell } from "iconoteka-vue";\n</script>\n\n<template>\n  <Bell />\n  <Bell weight="bold" variant="fill" :size="32" />\n</template>\n```' },

  { dir: "iconoteka-svelte", label: "Svelte", ext: "svelte", emit: svelte,
    peer: { svelte: ">=5" },
    fields: { svelte: "./index.js", main: "./index.js", types: "./index.d.ts",
              exports: { ".": { types: "./index.d.ts", svelte: "./index.js", default: "./index.js" },
                          "./icons/*": "./icons/*",
                          "./package.json": "./package.json" } },
    usage: '```svelte\n<script>\n  import { Bell } from "iconoteka-svelte";\n</script>\n\n<Bell />\n<Bell weight="bold" variant="fill" size={32} />\n```' }
];

const LICENSE = fs.readFileSync(path.join(ROOT, "LICENSE"), "utf8");

for (const t of TARGETS) {
  const base    = path.join(ROOT, "packages", t.dir);
  const iconDir = path.join(base, "icons");
  fs.rmSync(iconDir, { recursive: true, force: true });
  fs.mkdirSync(iconDir, { recursive: true });

  const exports = [];
  const names   = [];
  const taken   = new Set();

  for (const icon of DATA.icons) {
    const identity = icon.name.split("-")[0];
    const name     = componentName(identity);
    const paths    = variantData(icon);
    if (!Object.keys(paths).length) continue;

    fs.writeFileSync(path.join(iconDir, `${name}.${t.ext}`), t.emit(name, paths, sharedFillWeight(icon)));
    exports.push(`export { default as ${name} } from "./icons/${name}.${t.ext}";`);
    names.push(name);
    taken.add(name);
  }

  // Alias exports. Someone reaching for <Trash/> shouldn't need to know the
  // icon's identity is "garbage". An ES module can't export the same name
  // twice, so an alias can only become a component if exactly one icon answers
  // to it: either it's claimed by a single icon, or icons.json settles it.
  const owners = new Map();
  for (const icon of DATA.icons) {
    const identity = icon.name.split("-")[0];
    for (const a of icon.name.split("-").slice(1)) {
      if (!owners.has(a)) owners.set(a, new Set());
      owners.get(a).add(identity);
    }
  }
  const identities  = new Set(DATA.icons.map(i => i.name.split("-")[0]));
  const resolutions = (DATA.meta && DATA.meta.aliasResolutions) || {};

  // A settled word may name an icon that never claimed it — nothing tags "pen"
  // with "edit" — so walk the table as well as the claimed aliases.
  const candidates = new Set([...owners.keys(), ...Object.keys(resolutions)]);
  const aliasLines = [];
  let settled = 0;
  for (const alias of [...candidates].sort()) {
    if (identities.has(alias)) continue;          // already an icon's own name
    const resolved = resolutions[alias];
    const claimed  = owners.get(alias);
    let identity;
    if (resolved) {
      identity = resolved;
      if (!claimed || claimed.size > 1) settled++;
    } else if (claimed && claimed.size === 1) {
      identity = [...claimed][0];
    } else {
      continue;                                   // ambiguous and unsettled
    }
    const aliasName = componentName(alias);
    if (taken.has(aliasName)) continue;           // would collide with a real export
    taken.add(aliasName);
    const target = componentName(identity);
    aliasLines.push(`export { default as ${aliasName} } from "./icons/${target}.${t.ext}";`);
    names.push(aliasName);
  }

  fs.writeFileSync(
    path.join(base, "index.js"),
    exports.join("\n") + "\n\n// Aliases — additional names for the icons above.\n" +
    aliasLines.join("\n") + "\n"
  );
  console.log(`    + ${aliasLines.length} alias exports (${settled} from the resolution table)`);

  // One alias per framework keeps 4512 declarations to a single short line.
  const decls = names
    .map(n => `export declare const ${n}: ${DECL_BY_LABEL[t.label]};`)
    .join("\n");
  fs.writeFileSync(path.join(base, "index.d.ts"), TYPES_BY_LABEL[t.label] + "\n" + decls + "\n");

  fs.writeFileSync(
    path.join(base, "package.json"),
    JSON.stringify(manifest(t.dir, { label: t.label, fields: t.fields, peer: t.peer }), null, 2) + "\n"
  );
  fs.writeFileSync(path.join(base, "README.md"), readme(t.dir, t.label, t.usage));
  fs.writeFileSync(path.join(base, "LICENSE"), LICENSE);

  console.log(`✅  ${t.dir} — ${names.length} components`);
}
