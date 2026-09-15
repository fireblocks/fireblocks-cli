import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RejectApproval extends FireblocksBaseCommand {
  static summary = 'Reject an approval request'

  static description = 'Reject a pending approval request as the authenticated API user. No signature is required (unlike approve). The caller must be eligible to act on the request; rejecting finalizes the request as rejected per the approval policy.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin.\n\nOperation ID: rejectApproval\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/rejectApproval'

  static enableJsonFlag = false

  static flags = {
    'request-id': Flags.string({
      description: 'The approval request ID.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/approvals/{requestId}/reject'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RejectApproval)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['requestId'] = String(flags['request-id'])


    await this.confirmOrAbort('POST', '/v1/approvals/{requestId}/reject')

    const result = await this.makeRequest(
      'POST',
      '/v1/approvals/{requestId}/reject',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
