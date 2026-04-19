import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Consolidate extends FireblocksBaseCommand {
  static summary = 'Consolidate staking positions (ETH validator consolidation)'

  static description = 'Consolidates the source staking position into the destination, merging the balance into the destination and closing the source position once complete. Both positions must be from the same funding vaults account (i.e. same withdrawals credentials).  On chain, this translates into a consolidation transaction, where the  source validator is consolidated into the destination validator.  Supported chains: Ethereum (ETH) only.\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor.\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: consolidate\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/consolidate'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the staking operation (e.g., ETH).',
      required: true,
      options: ['ETH', 'ETH_TEST6', 'ETH_TEST_HOODI'],
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
  static path = '/v1/staking/chains/{chainDescriptor}/consolidate'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Consolidate)

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


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/consolidate')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/consolidate',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
