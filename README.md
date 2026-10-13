# @fireblocks/fireblocks-cli

Command-line interface for the [Fireblocks](https://developers.fireblocks.com) API. Configure once, invoke any Fireblocks operation from your terminal or AI agent.

Commands are generated from the Fireblocks OpenAPI spec, so every endpoint is reachable and new endpoints appear automatically when the CLI updates. Authentication and JWT request signing are handled for you.

## Install

### Homebrew (macOS)

```bash
brew tap fireblocks/fireblocks-cli
brew install fireblocks-cli
```

### npm (macOS / Linux / Windows)

```bash
npm install -g @fireblocks/fireblocks-cli
```

### Standalone installers

Download the latest release for your platform from [GitHub Releases](https://github.com/fireblocks/fireblocks-cli/releases). No Node.js required.

#### macOS

| Architecture | Installer | Tarball |
|---|---|---|
| ARM64 (Apple Silicon) | `fireblocks-v*-arm64.pkg` | `fireblocks-v*-darwin-arm64.tar.gz` |
| x64 (Intel) | `fireblocks-v*-x64.pkg` | `fireblocks-v*-darwin-x64.tar.gz` |

#### Windows

| Architecture | Installer | Tarball |
|---|---|---|
| x64 | `fireblocks-v*-x64.exe` | `fireblocks-v*-win32-x64.tar.gz` |

> **Note:** If the installer shows "PATH not updated" during installation, your system PATH exceeds Windows' 1024-character limit. Use `npm install -g @fireblocks/fireblocks-cli` instead, or manually add `C:\Program Files\fireblocks\bin` to your PATH after installing.

#### Linux

| Architecture | `.deb` (Ubuntu / Debian) | Tarball |
|---|---|---|
| x64 | `fireblocks-v*-amd64.deb` | `fireblocks-v*-linux-x64.tar.gz` |
| ARM64 | `fireblocks-v*-arm64.deb` | `fireblocks-v*-linux-arm64.tar.gz` |

Tarballs are also available as `.tar.xz` for smaller downloads.

To verify a download, compare the `sha256` shown on the release page against:
```bash
# macOS / Linux
sha256sum <downloaded-file>
# macOS alternative
shasum -a 256 <downloaded-file>
```

## Versioning

This CLI follows [semantic versioning](https://semver.org), with one exception: commands that call operations in the `beta` lifecycle state. Beta operations are not generally available and may not be accessible to all customers. They can change or be removed without notice.

## Quick start

```bash
# 1. Configure your API key and secret (from the Fireblocks Console)
fireblocks configure

# 2. Verify credentials
fireblocks whoami

# 3. Make a request
fireblocks vaults get-paged-vault-accounts

# 4. Discover the API
fireblocks help-index
```

## Commands

### `fireblocks configure` — Manage credentials

Interactive setup that stores your API key ID and RSA secret in `~/.config/fireblocks/config.json`. For agents and CI, use env vars or flags instead (see [Authentication](#authentication)).

```bash
fireblocks configure                       # set up the default profile
fireblocks configure --profile profile-name     # named profile for multi-env setups
fireblocks configure --set-default=profile-name # switch the default profile without re-entering credentials
```

When configuring a second profile you are asked whether to make it the default. The config always stores the `baseUrl` explicitly so the file is self-describing.

### `fireblocks whoami` — Show current profile

Prints the default profile name, masked API key, and base URL from the local config file. No API call is made.

```bash
fireblocks whoami
```

Example output:
```json
{
  "defaultProfile": "default",
  "apiKey": "apiKey",
  "baseUrl": "https://api.fireblocks.io"
}
```

### `fireblocks <namespace> <action>` — API operations

Commands are generated from the Fireblocks OpenAPI spec. OpenAPI path parameters become required flags (kebab-case); query parameters become optional flags. Write ops take the body as `--data '<json>'`.

```bash
# Reads
fireblocks vaults get-paged-vault-accounts
fireblocks vaults get-vault-account --vault-account-id 0

# Writes (include --no-confirm for non-interactive)
fireblocks transactions create-transaction \
  --data '{"assetId":"BTC","amount":"0.01","source":{"type":"VAULT_ACCOUNT","id":"0"},"destination":{"type":"VAULT_ACCOUNT","id":"1"}}' \
  --no-confirm

# Idempotent retries
fireblocks transactions create-transaction \
  --data '{...}' \
  --idempotency-key "$(uuidgen)" --no-confirm
```

**Global flags:**

| Flag | Env Var | Purpose |
|------|---------|---------|
| `--api-key` | `FIREBLOCKS_API_KEY` | API key ID |
| `--secret-key` | `FIREBLOCKS_SECRET_KEY` / `FIREBLOCKS_SECRET_KEY_PATH` | RSA private key (PEM string or path) |
| `--base-url` | `FIREBLOCKS_BASE_URL` | Override endpoint (default `https://api.fireblocks.io`, sandbox `https://sandbox-api.fireblocks.io`) |
| `--profile` | | Named config profile |
| `--data` | | JSON body for write operations |
| `--idempotency-key` | | UUID for safe retries of write operations |
| `--no-confirm` | | Skip confirmation prompt on writes |
| `--dry-run` | | Print the assembled request without sending |
| `--debug` | | Log request/response details to stderr |
| `--output` | | Output format: `json` (default) or `yaml` |

### `fireblocks help-index` — Discover the API

`help-index` prints a compact JSON manifest of every resource and action the CLI exposes — under 2K tokens for the full catalog. Designed for agents: one call gives enough to plan, without loading per-resource docs upfront.

```bash
fireblocks help-index                              # all resources and actions
fireblocks vaults --help                           # detail for one namespace
fireblocks vaults get-vault-account --help         # detail for one action
fireblocks vaults get-vault-account --dry-run      # preview the request
```

Progressive disclosure: start narrow with `--help`, widen to `help-index` only when you need to find something.

## Authentication

Credentials resolve in this order (highest priority first):

1. CLI flags: `--api-key`, `--secret-key`
2. Environment variables: `FIREBLOCKS_API_KEY` + (`FIREBLOCKS_SECRET_KEY` | `FIREBLOCKS_SECRET_KEY_PATH`)
3. Config profile: `~/.config/fireblocks/config.json` (select with `--profile <name>`)

`fireblocks configure` is interactive-only. Agents and CI must use flags or env vars.

### Approvals and security

Write operations run against your workspace's **Transaction Authorization Policy (TAP)**. The CLI submits requests; TAP decides whether they require co-signer or admin approval. The CLI is not a security boundary — TAP is. Treat CLI credentials with the same care you'd treat any key into a custody platform.

## Output and errors

- **stdout**: JSON data only
- **stderr**: lifecycle warnings, debug logs, and errors

**Lifecycle warnings.** When a response reports a non-GA lifecycle state (`beta`, `deprecated` or `closed`), the CLI prints one line to stderr naming the operation. The state is read from the `Fireblocks-Lifecycle-State` response header, so it is accurate whatever CLI version you have installed:

```
Warning: Operation 'getWebhooks' is in 'beta' lifecycle state and is not generally available. It may change or be removed without notice.
```

For `deprecated` operations it includes the sunset date, plus the replacement and migration guide when the API provides them. A `closed` operation is normally answered with `410 Gone`, which needs no warning; if it still responds (your workspace has a temporary exception), the CLI warns that the operation has been closed and your access may be revoked. The warning is informational: stdout and the exit code are unchanged, and it also appears on error responses. To suppress it, set `FIREBLOCKS_SDK_SUPPRESS_LIFECYCLE_WARNING` to any value other than `0` or `false`:

```bash
export FIREBLOCKS_SDK_SUPPRESS_LIFECYCLE_WARNING=1
```

Errors are structured JSON on stderr:

```json
{"code": 5, "status": 429, "message": "Rate limit exceeded", "request_id": "abc-123", "retry_after": 30}
```

**Exit codes:**

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Client error (400/409/422) |
| 2 | Usage/parse error |
| 3 | Auth error (401/403) |
| 4 | Not found (404) |
| 5 | Rate limited (429) — retry after `retry_after` seconds |
| 6 | Server error (500+) |
| 7 | Timeout (30s) |

## AI agents

The CLI is designed to be driven by coding agents (Claude Code, Cursor, Devin). Install the CLI, then drop [`SKILL.md`](.claude/skills/fireblocks-cli/SKILL.md) into your agent's skills directory. Agents will:

- Discover operations via `help-index`
- Compose workflows by piping JSON between commands
- Retry intelligently using exit codes and `retry_after`

```bash
# List vault accounts, filter with jq, pipe to the next command
fireblocks vaults get-paged-vault-accounts \
  | jq -r '.accounts[] | select(.assets[].balance > 0) | .id'
```

### Complementary to MCP (AI Link)

For agent workflows that benefit from typed tool schemas, use [Fireblocks AI Link](https://developers.fireblocks.com) MCP. Use the CLI for leaf operations, scripts, and any time ambient schema tokens aren't worth the context cost. The two are designed to coexist.

## Contributing

Issues and PRs welcome at [github.com/fireblocks/fireblocks-cli](https://github.com/fireblocks/fireblocks-cli).

## License

[MIT](LICENSE)