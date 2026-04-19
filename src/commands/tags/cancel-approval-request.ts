import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CancelApprovalRequest extends FireblocksBaseCommand {
  static summary = 'Cancel an approval request by id'

  static description = 'Cancel an approval request by id. Can only cancel requests in PENDING status. Returns 202 Accepted when the cancellation is processed.\n\nOperation ID: cancelApprovalRequest\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/cancelApprovalRequest'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The id parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/tags/approval_requests/{id}/cancel'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CancelApprovalRequest)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('POST', '/v1/tags/approval_requests/{id}/cancel')

    const result = await this.makeRequest(
      'POST',
      '/v1/tags/approval_requests/{id}/cancel',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
