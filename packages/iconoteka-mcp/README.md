# iconoteka-mcp

MCP server for [Iconoteka](https://iconoteka.com) — let an AI assistant
search 1,300 icons and hand back paste-ready SVG.

Ask for "a notification bell, medium weight" and the assistant returns the real
icon, rather than inventing a path or reaching for whatever library it happens
to remember.

## Setup

Each client stores MCP servers in its own format, so use the entry for yours.

**Claude Code**

```bash
claude mcp add --scope user iconoteka -- npx -y iconoteka-mcp
```

**Codex**

```bash
codex mcp add iconoteka -- npx -y iconoteka-mcp
```

Or in `~/.codex/config.toml`:

```toml
[mcp_servers.iconoteka]
command = "npx"
args = ["-y", "iconoteka-mcp"]
```

**VS Code (GitHub Copilot)**

```bash
code --add-mcp '{"name":"iconoteka","command":"npx","args":["-y","iconoteka-mcp"]}'
```

Or per workspace in `.vscode/mcp.json` — note the key is `servers`:

```json
{
  "servers": {
    "iconoteka": {
      "command": "npx",
      "args": ["-y", "iconoteka-mcp"]
    }
  }
}
```

**Cursor, Claude Desktop, Windsurf and Gemini CLI** share one shape, each in
its own file:

| Client | File |
|---|---|
| Cursor | `~/.cursor/mcp.json`, or `.cursor/mcp.json` in a project |
| Claude Desktop | `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS), `%APPDATA%\Claude\claude_desktop_config.json` (Windows) |
| Windsurf | `~/.codeium/windsurf/mcp_config.json` |
| Gemini CLI | `~/.gemini/settings.json`, or `.gemini/settings.json` in a project |

```json
{
  "mcpServers": {
    "iconoteka": {
      "command": "npx",
      "args": ["-y", "iconoteka-mcp"]
    }
  }
}
```

**Zed** — in `settings.json`, under `context_servers`:

```json
{
  "context_servers": {
    "iconoteka": {
      "command": "npx",
      "args": ["-y", "iconoteka-mcp"],
      "env": {}
    }
  }
}
```

It runs offline: the icon data ships inside the package.

## Tools

**`search_icons`** — find icons by meaning or name. Returns ranked matches with
the weights and styles each one has, plus its other keywords.

```
search_icons({ query: "notification bell" })
→ bell  [Interface] ★popular  score 949
      variants: 7 weights, fill varies by weight
      also matches: notification, notify, reminder, ring, sound
```

Optional `category` and `limit`.

**`get_icon`** — SVG markup for one icon, or for several in a single call.

```
get_icon({ name: "bell", weight: "medium", style: "fill" })
→ bell — medium fill — Interface

  <svg width="24" height="24" viewBox="0 0 24 24" …>
    <path d="M12 22.25C10.375…" fill="currentColor"/>
  </svg>
```

Pass an array to fetch up to 24 icons at once, so a whole toolbar takes one
request:

```
get_icon({ name: ["bell", "trash", "pen"] })
→ one block per icon, separated by ---
```

`weight` is `thin` `ultralight` `light` `regular` `medium` `semibold` `bold`
(default `regular`); `style` is `stroke` or `fill` (default `stroke`). The path
uses `currentColor`, so it inherits the surrounding text colour.

`name` takes an icon's own name or the word people reach for: `trash`, `edit`
and `settings` each resolve to the right icon.

Most icons have all 14 variants; some have 7 or 8. Ask for one that doesn't
exist and the server says what to use instead — for example, `"download" has no
fill; it is a stroke-only icon. Use style "stroke".`

**`list_categories`** — all 23 categories with icon counts.

## Support

Iconoteka is a free, open-source library created and maintained by one person.
Support its future development through a monthly
[Patreon](https://www.patreon.com/c/iconoteka) subscription or a one-time
[Ko-fi](https://ko-fi.com/iconoteka) donation.

## License

MIT — both this server and the icons. Free for personal and commercial use,
including closed-source. No attribution required.

The Iconoteka name and logo are not covered by the MIT grant.
