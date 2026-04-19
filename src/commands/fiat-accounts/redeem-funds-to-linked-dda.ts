import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RedeemFundsToLinkedDDA extends FireblocksBaseCommand {
  static summary = 'Redeem funds to DDA'

  static description = 'Redeems funds to the linked DDA.\n\nOperation ID: redeemFundsToLinkedDDA\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Fiat%20accounts/redeemFundsToLinkedDDA'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the fiat account to use',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/fiat_accounts/{accountId}/redeem_to_linked_dda'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RedeemFundsToLinkedDDA)

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
    pathParams['accountId'] = String(flags['account-id'])


    await this.confirmOrAbort('POST', '/v1/fiat_accounts/{accountId}/redeem_to_linked_dda')

    const result = await this.makeRequest(
      'POST',
      '/v1/fiat_accounts/{accountId}/redeem_to_linked_dda',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
