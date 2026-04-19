import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResendWebhooks extends FireblocksBaseCommand {
  static summary = 'Resend failed webhooks'

  static description = 'Resends all failed webhook notifications.\n\nLearn more about Fireblocks Webhooks in the following [guide](https://developers.fireblocks.com/docs/configure-webhooks).\n\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: resendWebhooks\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks/resendWebhooks'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/webhooks/resend'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResendWebhooks)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/webhooks/resend')

    const result = await this.makeRequest(
      'POST',
      '/v1/webhooks/resend',
      {
        headers,
      },
    )

    return result
  }
}
