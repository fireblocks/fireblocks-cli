import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ClaimRewards extends FireblocksBaseCommand {
  static summary = 'Claim accrued rewards'

  static description = 'Claims available staking rewards for the specified chain and vault. Supported chains: Solana and Polygon (Matic). Behavior depends on protocol reward distribution.\n\nOperation ID: claimRewards\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/claimRewards'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the claim rewards staking operation (e.g., MATIC/SOL).',
      required: true,
      options: ['SOL', 'SOL_TEST', 'MATIC'],
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
  static path = '/v1/staking/chains/{chainDescriptor}/claim_rewards'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ClaimRewards)

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


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/claim_rewards')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/claim_rewards',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
