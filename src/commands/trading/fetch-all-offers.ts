import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FetchAllOffers extends FireblocksBaseCommand {
  static summary = 'Get all offers'

  static description = 'Retrieve all available offers across the workspace for a given asset pair.\nAlways operates in open scope — no provider or account selection required.\nReturns a mix of indicative rates and committed quotes as applicable per provider.\n\nIf no slippageBps is provided, it defaults to 50 bps (0.5%).\nSlippage and settlement configuration do not affect the returned rate.\n\nNote: These endpoints are currently in beta and might be subject to changes.\n\nIf you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Editor.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: fetchAllOffers\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/fetchAllOffers'

  static enableJsonFlag = false

  static flags = {
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
  static path = '/v1/trading/offers'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FetchAllOffers)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

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



    await this.confirmOrAbort('POST', '/v1/trading/offers')

    const result = await this.makeRequest(
      'POST',
      '/v1/trading/offers',
      {
        body,
        headers,
      },
    )

    return result
  }
}
