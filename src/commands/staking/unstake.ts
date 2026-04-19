import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Unstake extends FireblocksBaseCommand {
  static summary = 'Initiate unstake'

  static description = 'Submits a chain-specific unstake request.\n\nOperation ID: unstake\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/unstake'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the unstake staking operation (e.g., SOL/SOL_TEST/MATIC).',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/staking/chains/{chainDescriptor}/unstake'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Unstake)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['chainDescriptor'] = String(flags['chain-descriptor'])


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/unstake')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/unstake',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
