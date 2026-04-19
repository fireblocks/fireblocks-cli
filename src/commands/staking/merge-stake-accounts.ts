import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class MergeStakeAccounts extends FireblocksBaseCommand {
  static summary = 'Merge staking positions'

  static description = 'Merges the source stake account into the destination, consolidating the balance into the destination and closing the source account once complete. Both accounts must be from the same validator provider and of same vault account.. Supported chains: Solana (SOL).\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: mergeStakeAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/mergeStakeAccounts'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the merge staking operation (e.g., SOL).',
      required: true,
      options: ['SOL', 'SOL_TEST'],
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
  static path = '/v1/staking/chains/{chainDescriptor}/merge'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(MergeStakeAccounts)

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


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/merge')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/merge',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
