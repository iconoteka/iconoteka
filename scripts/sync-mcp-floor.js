// Keep iconoteka-mcp requiring the icon data it was released alongside.
//
// npx upgrades iconoteka-mcp inside the folder it already has, but leaves a
// dependency alone while its version still satisfies the declared range. With
// "iconoteka": "^2.0.12", someone who installed weeks ago got the new server and
// kept 2.0.12 data indefinitely — old names, missing icons. Raising the floor to
// the current data version forces the data to move with the server.

const fs   = require("fs");
const path = require("path");

const DATA = path.join(__dirname, "../packages/iconoteka/package.json");
const MCP  = path.join(__dirname, "../packages/iconoteka-mcp/package.json");

const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
const mcp  = JSON.parse(fs.readFileSync(MCP, "utf8"));
const want = "^" + data.version;

if (mcp.dependencies.iconoteka === want) {
  console.log(`✅  iconoteka-mcp already requires iconoteka ${want}`);
} else {
  const was = mcp.dependencies.iconoteka;
  mcp.dependencies.iconoteka = want;
  fs.writeFileSync(MCP, JSON.stringify(mcp, null, 2) + "\n");
  console.log(`⚠️  iconoteka-mcp now requires iconoteka ${want} (was ${was}).`);
  console.log(`    Publish a new iconoteka-mcp as well, or existing installs keep the old icons.`);
}
