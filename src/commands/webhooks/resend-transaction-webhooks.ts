import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResendTransactionWebhooks extends FireblocksBaseCommand {
  static summary = 'Resend webhooks for a transaction by ID'

  static description = 'Resends webhook notifications for a transaction by its unique identifier.\n\nLearn more about Fireblocks Webhooks in the following [guide](https://developers.fireblocks.com/docs/configure-webhooks).\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: resendTransactionWebhooks\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks/resendTransactionWebhooks'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The ID of the transaction for webhooks',
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
  static path = '/v1/webhooks/resend/{txId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResendTransactionWebhooks)

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
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/webhooks/resend/{txId}')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks/resend/{txId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
