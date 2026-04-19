import {FireblocksBaseCommand} from '../lib/base-command.js'

function maskApiKey(key: string): string {
  if (key.length <= 8) return '****'
  return key.slice(0, 4) + '...' + key.slice(-4)
}

export default class Whoami extends FireblocksBaseCommand {
  static override description = 'Show current auth context and verify credentials'

  static override examples = [
    '$ fireblocks whoami',
    '$ fireblocks whoami --dry-run',
    '$ fireblocks whoami --profile staging',
  ]

  static override flags = {
    ...FireblocksBaseCommand.baseFlags,
  }

  static override enableJsonFlag = true

  async run(): Promise<Record<string, unknown>> {
    const {flags} = await this.parse(Whoami)
    const auth = await this.resolveAuth()

    const info: Record<string, unknown> = {
      apiKey: maskApiKey(auth.apiKey),
      baseUrl: auth.baseUrl,
    }

    if (flags.profile) {
      info.profile = flags.profile
    }

    if (flags['dry-run']) {
      this.log('Resolved auth context (dry-run, no API call):')
      this.log(JSON.stringify(info, null, 2))
      return info
    }

    // Verify credentials by calling the users/me endpoint
    const result = await this.makeRequest('GET', '/v1/users/me')
    info.verified = true
    info.user = result

    return info
  }
}
