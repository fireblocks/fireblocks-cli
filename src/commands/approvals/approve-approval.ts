import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ApproveApproval extends FireblocksBaseCommand {
  static summary = 'Approve an approval request'

  static description = 'Approve a pending approval request as the authenticated API user. The caller signs the request\'s signable data with the private key of a registered approval API key and submits the base64url-encoded signature, optionally with the key ID. The server verifies the signature against the registered public key — using the given key ID, or matching against all of the user\'s registered keys when the key ID is omitted — and advances the approval quorum.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin.\n\nOperation ID: approveApproval\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/approveApproval'

  static enableJsonFlag = false

  static flags = {
    'request-id': Flags.string({
      description: 'The approval request ID.',
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
  static path = '/v1/approvals/{requestId}/approve'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ApproveApproval)

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

    const pathParams: Record<string, string> = {}
    pathParams['requestId'] = String(flags['request-id'])


    await this.confirmOrAbort('POST', '/v1/approvals/{requestId}/approve')

    const result = await this.makeRequest(
      'POST',
      '/v1/approvals/{requestId}/approve',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
