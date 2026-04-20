# @fireblocks/cli

Agent-first CLI for Fireblocks infrastructure. Execute any Fireblocks API operation from the command line.

## Installation

### Homebrew (macOS)

```bash
brew tap fireblocks/fireblocks-cli
brew install fireblocks-cli
```

### npm (macOS / Linux / Windows)

```bash
npm install -g @fireblocks/cli
```

### Standalone installers

Download the latest release for your platform from the [GitHub Releases](https://github.com/fireblocks/fireblocks-cli/releases) page:

| Platform | File |
|----------|------|
| macOS ARM64 (Apple Silicon) | `fireblocks-cli-*-darwin-arm64.pkg` |
| macOS x64 (Intel) | `fireblocks-cli-*-darwin-x64.pkg` |
| Windows x64 | `fireblocks-cli-*-x64.exe` |
| Linux x64 — `.deb` (Ubuntu, Debian) | `fireblocks-cli-*-amd64.deb` |
| Linux x64 — `.rpm` (CentOS, RHEL, Fedora) | `fireblocks-cli-*-x86_64.rpm` |
| Linux x64 (tarball) | `fireblocks-cli-*-linux-x64.tar.gz` |
| Linux ARM64 (tarball) | `fireblocks-cli-*-linux-arm64.tar.gz` |

No Node.js required for standalone installers.

## Quick Start

```bash
fireblocks configure
fireblocks vaults get-vault-accounts-paged --json
fireblocks help-index
```

## Documentation

See [SKILL.md](./.claude/skills/fireblocks-cli/SKILL.md) for usage patterns and examples.
