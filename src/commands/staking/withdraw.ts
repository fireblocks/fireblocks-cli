import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Withdraw extends FireblocksBaseCommand {
  static summary = 'Withdraw staked funds'

  static description = 'Withdraws funds that have completed the unbonding period. Typically requires the position to be deactivated first (unstake → unbond → withdraw). Amount and timing vary by chain protocol.\n\nOperation ID: withdraw\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/withdraw'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the withdraw staking operation (e.g., ATOM_COS/ETH/STETH_ETH).',
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
  static path = '/v1/staking/chains/{chainDescriptor}/withdraw'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Withdraw)

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


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/withdraw')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/withdraw',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
