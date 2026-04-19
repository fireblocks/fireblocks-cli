---
name: fireblocks-cli
description: Agent-first CLI for Fireblocks infrastructure. Execute any Fireblocks API operation from the command line.
---

# Fireblocks CLI

## Command Pattern
```
fireblocks <namespace> <action> [flags]
```

## Discovery

- `fireblocks help-index` -- compact JSON index of all commands (<2K tokens).
  Returns: `{commands: [{namespace, action, description, method?, path?, flags: [{name, type, required}]}]}`
- `fireblocks <namespace> --help` -- list actions in a namespace.
- `fireblocks <namespace> <action> --help` -- show all flags for one command.
- `fireblocks <namespace> <action> --dry-run [flags]` -- preview request (method, url, params, body) without executing.
- `fireblocks whoami` -- verify credentials, calls GET /v1/users/me. Returns masked API key, base URL, and verification status.

## Authentication

Resolution order (highest priority first):
1. CLI flags: `--api-key`, `--secret-key`
2. Env vars: `FIREBLOCKS_API_KEY` + (`FIREBLOCKS_SECRET_KEY` | `FIREBLOCKS_SECRET_KEY_PATH`)
3. Config profile: `~/.config/fireblocks/config.json` (select with `--profile <name>`)
4. Error if no credentials found.

`--secret-key` accepts either an inline PEM string (detected by `-----BEGIN` marker) or a file path.

`fireblocks configure` is interactive-only. Agents must use env vars or flags.

## Flag Conventions

- OpenAPI path params (e.g. `{vaultAccountId}`) become required flags: `--vault-account-id`
- OpenAPI query params become optional flags with the same kebab-case conversion.
- Write ops (POST/PUT/PATCH/DELETE) accept `--data '<json>'` for the request body.
- Write ops that support idempotency accept `--idempotency-key <uuid>` for safe retries.

## Global Flags

| Flag | Env Var | Purpose |
|------|---------|---------|
| `--api-key` | `FIREBLOCKS_API_KEY` | API key |
| `--secret-key` | `FIREBLOCKS_SECRET_KEY` / `FIREBLOCKS_SECRET_KEY_PATH` | RSA private key (PEM or path) |
| `--base-url` | `FIREBLOCKS_BASE_URL` | Override API endpoint (default: `https://api.fireblocks.io`) |
| `--profile` | | Named config profile |
| `--no-confirm` | | Skip write-op confirmation prompt |
| `--dry-run` | | Preview request without executing |
| `--debug` | | Log request/response details to stderr |
| `--json` | | Force structured JSON output (oclif envelope) |

## Non-Interactive Usage

Always pass `--no-confirm` on write operations. The CLI auto-skips prompts when stdin is not a TTY, but explicit `--no-confirm` is safer and self-documenting.

## Output

- **stdout**: JSON data only.
- **stderr**: warnings, beta notices, errors, debug logs.
- `--debug` output on stderr: `[DEBUG] METHOD URL`, `[DEBUG] Body: ...`, `[DEBUG] Response: STATUS`, `[DEBUG] Request-ID: ...`
- Beta commands print to stderr: `Warning: This command is in beta and may change in future releases.` This is informational, not an error.

## Exit Codes

| Code | Meaning | Recovery |
|------|---------|----------|
| 0 | Success | |
| 1 | Client error (400/409/422) | Check request body/params |
| 2 | Usage/parse error | Check flag names and types |
| 3 | Auth error (401/403) | Verify credentials with `fireblocks whoami` |
| 4 | Not found (404) | Verify resource ID exists |
| 5 | Rate limited (429) | Wait `retry_after` seconds from error JSON, then retry |
| 6 | Server error (500+) | Retry after brief delay |
| 7 | Timeout (30s) | Retry; timeout is not configurable |

## Error Format

Errors are JSON on stderr:
```json
{"code": 5, "status": 429, "message": "Rate limit exceeded", "request_id": "abc-123", "retry_after": 30}
```
`request_id` and `retry_after` are present only when applicable.

## Examples
```bash
# List vault accounts
fireblocks vaults get-paged-vault-accounts --json

# Get a specific vault
fireblocks vaults get-vault-account --vault-account-id 0 --json

# Create a transaction (write op: requires --data and --no-confirm)
fireblocks transactions create-transaction \
  --data '{"assetId":"BTC","amount":"0.01","source":{"type":"VAULT_ACCOUNT","id":"0"},"destination":{"type":"VAULT_ACCOUNT","id":"1"}}' \
  --no-confirm

# Idempotent write with retry safety
fireblocks transactions create-transaction \
  --data '{"assetId":"ETH","amount":"1.0","source":{"type":"VAULT_ACCOUNT","id":"0"},"destination":{"type":"ONE_TIME_ADDRESS","oneTimeAddress":{"address":"0x1234"}}}' \
  --idempotency-key "$(uuidgen)" --no-confirm

# Preview without executing
fireblocks transactions create-transaction --data '{"assetId":"BTC","amount":"0.01"}' --dry-run

# Debug a failing request
fireblocks vaults get-vault-account --vault-account-id 0 --debug

# Use sandbox environment
fireblocks vaults get-paged-vault-accounts --base-url https://sandbox-api.fireblocks.io --json

# Verify auth setup
fireblocks whoami
```
