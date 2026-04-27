import {Command} from '@oclif/core'
import {readConfig, DEFAULT_BASE_URL} from '../lib/auth/config.js'

function maskApiKey(key: string): string {
  if (key.length <= 8) return '****'
  return key.slice(0, 4) + '...' + key.slice(-4)
}

export default class Whoami extends Command {
  static override description = 'Show the current default profile'

  static override examples = [
    '$ fireblocks whoami',
  ]

  static override enableJsonFlag = true

  async run(): Promise<Record<string, unknown>> {
    const config = await readConfig()
    if (!config) {
      this.error('No config found. Run `fireblocks configure` to set up credentials.')
    }

    const profileName = config.defaultProfile ?? 'default'
    const profile = config.profiles[profileName]
    if (!profile) {
      this.error(`Default profile "${profileName}" not found in config.`)
    }

    const info: Record<string, unknown> = {
      defaultProfile: profileName,
      apiKey: maskApiKey(profile.apiKey),
      baseUrl: profile.baseUrl ?? DEFAULT_BASE_URL,
    }

    this.log(JSON.stringify(info, null, 2))
    return info
  }
}