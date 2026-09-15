#!/usr/bin/env node

/**
 * Iconoteka build script
 *
 * File naming convention:
 *   /icons/{Category}/{name-parts-weight-style}.svg
 *
 *   e.g. /icons/People/user-identity-person-personal-b-f.svg
 *
 * Weight letters:  t=thin  u=ultralight  l=light  r=regular  m=medium  s=semibold  b=bold
 * Style letters:   f=fill  s=stroke
 *
 * Output: icons.json grouped as one entry per icon with all 14 variants nested inside
 */

const fs            = require("fs");
const path          = require("path");

const ICONS_DIR = path.join(__dirname, "../icons");
const POPULAR   = path.join(__dirname, "popular.json");
const OUTPUT    = path.join(__dirname, "../icons.json");
const WATCH     = process.argv.includes("--watch");

// ── Maps ─────────────────────────────────────────────────────────────────────

const WEIGHT_MAP = {
  t: "thin",
  u: "ultralight",
  l: "light",
  r: "regular",
  m: "medium",
  s: "semibold",
  b: "bold",
};

const STYLE_MAP = {
  f: "fill",
  s: "stroke",
};

const WEIGHT_ORDER = ["thin", "ultralight", "light", "regular", "medium", "semibold", "bold"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractPath(svgContent) {
  const match = svgContent.match(/<path[^>]*\sd="([^"]+)"/);
  return match ? match[1] : null;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function parseFilename(filename) {
  // Remove .svg
  const base = filename.replace(/\.svg$/i, "");
  const parts = base.split("-");

  // Last part = style (f or s)
  // Second to last = weight (t/u/l/r/m/s/b)
  // Everything before = icon name parts
  const styleLetter  = parts[parts.length - 1];
  const weightLetter = parts[parts.length - 2];
  const nameParts    = parts.slice(0, parts.length - 2);

  const weight = WEIGHT_MAP[weightLetter];
  const style  = STYLE_MAP[styleLetter];

  if (!weight || !style) return null;

  return {
    fullName:    nameParts.join("-"),
    displayName: capitalize(nameParts[0]),
    searchTerms: nameParts,
    weight,
    style,
  };
}

// ── Build ─────────────────────────────────────────────────────────────────────

function build() {
  if (!fs.existsSync(ICONS_DIR)) {
    console.error(`❌  /icons/ folder not found`);
    process.exit(1);
  }

  // Map: fullName → icon entry
  const iconsMap = {};

  // Walk category subfolders
  const categories = fs.readdirSync(ICONS_DIR).filter(f => {
    return fs.statSync(path.join(ICONS_DIR, f)).isDirectory();
  });

  // "Popular" is a curated view, not a category. The icons live in their real
  // categories; this list just flags them, so no SVG is stored twice.
  let popularSet = new Set();
  if (fs.existsSync(POPULAR)) {
    popularSet = new Set(JSON.parse(fs.readFileSync(POPULAR, "utf8")));
  }

  if (categories.length === 0) {
    console.warn("⚠️  No category folders found in /icons/");
  }

  for (const category of categories) {
    const catDir = path.join(ICONS_DIR, category);
    const files  = fs.readdirSync(catDir)
      .filter(f => f.toLowerCase().endsWith(".svg"))
      .sort();

    for (const file of files) {
      const parsed = parseFilename(file);
      if (!parsed) {
        console.warn(`⚠️  Skipping ${file} — couldn't parse weight/style`);
        continue;
      }

      const svgContent = fs.readFileSync(path.join(catDir, file), "utf8");
      const svgPath    = extractPath(svgContent);

      if (!svgPath) {
        console.warn(`⚠️  Skipping ${file} — no <path d="..."> found`);
        continue;
      }

      const { fullName, displayName, searchTerms, weight, style } = parsed;
      const key = `${category}__${fullName}`;

      // Create entry if first time seeing this icon
      if (!iconsMap[key]) {
        iconsMap[key] = {
          name:        fullName,
          displayName,
          searchTerms,
          category,
          variants: {},
        };
      }

      // Add variant
      if (!iconsMap[key].variants[weight]) {
        iconsMap[key].variants[weight] = {};
      }
      iconsMap[key].variants[weight][style] = svgPath;
    }
  }

  // Convert map to sorted array
  const icons = Object.values(iconsMap).sort((a, b) =>
    a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
  );

  // Flag the curated "Popular" selection by icon identity (first name segment)
  let popularHits = 0;
  for (const icon of icons) {
    if (popularSet.has(icon.name.split("-")[0])) {
      icon.popular = true;
      popularHits++;
    }
  }
  const missingPopular = [...popularSet].filter(
    id => !icons.some(i => i.name.split("-")[0] === id)
  );
  if (missingPopular.length) {
    console.warn(`\u26a0\ufe0f  popular.json lists ${missingPopular.length} unknown icon(s): ${missingPopular.join(", ")}`);
  }

  // Sort variants by weight order
  for (const icon of icons) {
    const sorted = {};
    for (const w of WEIGHT_ORDER) {
      if (icon.variants[w]) sorted[w] = icon.variants[w];
    }
    icon.variants = sorted;
  }

  // Version comes from package.json — bump "version" there for a release
  // npm needs semver in "version"; the library's display string lives in
  // "libraryVersion" and is what the website and plugin show.
  // Version comes from the published data package, not the workspace root.
const pkg = require("../packages/iconoteka/package.json");
  const version = pkg.libraryVersion || pkg.version;

  // Curated "Popular" selection, in list order, so consumers get it from
  // icons.json alone without needing the repo.
  const popularNames = [...popularSet].filter(id =>
    icons.some(i => i.name.split("-")[0] === id)
  );

  // Which icon a bare word answers to when several claim it as an alias, or
  // when the word isn't anyone's alias at all. Most were settled by resolving
  // both sides to the same source glyph; the rest by hand. Shipping the table
  // inside icons.json means the MCP, the wrappers and the site all resolve
  // "trash" or "edit" the same way, with nothing extra to fetch.
  const resolutions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../data/alias-resolutions.json"), "utf8")
  );
  const identitySet = new Set(icons.map(i => i.name.split("-")[0]));
  for (const [alias, target] of Object.entries(resolutions)) {
    if (!identitySet.has(target)) {
      throw new Error(`alias-resolutions: "${alias}" points at "${target}", which is not an icon identity`);
    }
    if (identitySet.has(alias)) {
      throw new Error(`alias-resolutions: "${alias}" is already an icon's own identity; it needs no resolution`);
    }
  }

  const output = {
    meta: {
      version,
      count:     icons.length,
      categories: categories.length,
      updatedAt: new Date().toISOString(),
      cdn:       `https://cdn.jsdelivr.net/gh/turbaba/Iconoteka@${version}/icons.json`,
      popular:   popularNames,
      aliasResolutions: resolutions,
    },
    icons,
  };

  const json = JSON.stringify(output, null, 2);

  // Root icons.json is the canonical CDN artifact — jsDelivr and
  // raw.githubusercontent URLs point at it, so it must not move.
  fs.writeFileSync(OUTPUT, json);

  // The npm package can only ship files inside its own directory.
  const PKG_COPY = path.join(__dirname, "../packages/iconoteka/icons.json");
  if (fs.existsSync(path.dirname(PKG_COPY))) fs.writeFileSync(PKG_COPY, json);

  // The MCP must require this data version, or npx upgrades leave users on old icons.
  require("./sync-mcp-floor.js");

  console.log(`✅  Built icons.json — ${icons.length} unique icons across ${categories.length} categories`);
}

// ── Watch ─────────────────────────────────────────────────────────────────────

if (WATCH) {
  try {
    const chokidar = require("chokidar");
    console.log("👀  Watching /icons/ for changes…");
    build();
    chokidar.watch(ICONS_DIR, { ignoreInitial: true }).on("all", (e, f) => {
      console.log(`  → ${e}: ${path.basename(f)}`);
      build();
    });
  } catch {
    console.error("⚠️  Run: npm install");
    process.exit(1);
  }
} else {
  build();
}
