import {readFile, mkdir, writeFile} from 'node:fs/promises'
import {homedir} from 'node:os'
import {join, resolve} from 'node:path'

export interface AuthContext {
  apiKey: string
  privateKey: string
  baseUrl: string
}

export interface ProfileConfig {
  apiKey: string
  privateKeyPath: string
  baseUrl?: string
}

export interface CliConfig {
  profiles: Record<string, ProfileConfig>
  defaultProfile: string
}

const CONFIG_DIR = join(homedir(), '.config', 'fireblocks')
const CONFIG_PATH = join(CONFIG_DIR, 'config.json')
export const DEFAULT_BASE_URL = 'https://api.fireblocks.io'

export function getConfigPath(): string {
  return CONFIG_PATH
}

export async function readConfig(): Promise<CliConfig | null> {
  try {
    const raw = await readFile(CONFIG_PATH, 'utf-8')
    return JSON.parse(raw) as CliConfig
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') return null
    if (code === 'EACCES') {
      throw new Error(`Permission denied reading config at ${CONFIG_PATH}. Check file permissions (should be 0600).`, {cause: error})
    }

    throw new Error(`Failed to read config at ${CONFIG_PATH}: ${(error as Error).message}`, {cause: error})
  }
}

export async function writeConfig(config: CliConfig): Promise<void> {
  await mkdir(CONFIG_DIR, {recursive: true, mode: 0o700})
  await writeFile(CONFIG_PATH, JSON.stringify(config, null, 2) + '\n', {encoding: 'utf-8', mode: 0o600})
}

async function readPrivateKey(pathOrInline: string): Promise<string> {
  if (pathOrInline.trimStart().startsWith('-----BEGIN')) {
    return pathOrInline
  }

  const resolved = resolve(pathOrInline)
  const content = await readFile(resolved, 'utf-8')
  if (!content.trimStart().startsWith('-----BEGIN')) {
    throw new Error(`File at ${resolved} does not appear to contain a PEM-encoded key`)
  }

  return content
}

export async function resolveAuth(options: {
  apiKey?: string
  secretKey?: string
  profile?: string
  baseUrl?: string
}): Promise<AuthContext> {
  // 1. CLI flags (highest priority)
  let apiKey = options.apiKey
  let secretKeyRaw = options.secretKey
  let baseUrl = options.baseUrl

  // 2. Environment variables
  if (!apiKey) apiKey = process.env.FIREBLOCKS_API_KEY
  if (!secretKeyRaw) {
    secretKeyRaw = process.env.FIREBLOCKS_SECRET_KEY ?? process.env.FIREBLOCKS_SECRET_KEY_PATH
  }

  if (!baseUrl) baseUrl = process.env.FIREBLOCKS_BASE_URL

  // 3. Config file profile
  if (!apiKey || !secretKeyRaw) {
    const config = await readConfig()
    if (config) {
      const profileName = options.profile ?? config.defaultProfile ?? 'default'
      const profile = config.profiles[profileName]
      if (profile) {
        if (!apiKey) apiKey = profile.apiKey
        if (!secretKeyRaw) secretKeyRaw = profile.privateKeyPath
        if (!baseUrl) baseUrl = profile.baseUrl
      }
    }
  }

  if (!apiKey || !secretKeyRaw) {
    throw new Error(
      'Missing Fireblocks credentials. Provide --api-key and --secret-key flags, ' +
        'set FIREBLOCKS_API_KEY and FIREBLOCKS_SECRET_KEY environment variables, ' +
        'or run `fireblocks configure` to set up a profile.',
    )
  }

  const privateKey = await readPrivateKey(secretKeyRaw)

  const resolvedBaseUrl = baseUrl ?? DEFAULT_BASE_URL

  let parsed: URL
  try {
    parsed = new URL(resolvedBaseUrl)
  } catch {
    throw new Error(`Invalid base URL: "${resolvedBaseUrl}"`)
  }

  if (parsed.protocol === 'http:' && !['1', 'true'].includes(process.env.FIREBLOCKS_ALLOW_HTTP ?? '')) {
    throw new Error(
      'HTTP base URLs are not allowed — credentials would be sent in cleartext. ' +
        'Use HTTPS or set FIREBLOCKS_ALLOW_HTTP=1 for local development.',
    )
  }

  if (!['https:', 'http:'].includes(parsed.protocol)) {
    throw new Error(`Invalid base URL protocol: ${parsed.protocol} — only https: is allowed`)
  }

  return {
    apiKey,
    privateKey,
    baseUrl: resolvedBaseUrl,
  }
}
