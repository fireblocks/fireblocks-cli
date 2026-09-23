import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateApprovalKey extends FireblocksBaseCommand {
  static summary = 'Register an approval key'

  static description = 'Register an approval public key for an API user, used to sign approval requests. Up to 2 active keys are supported per API user. Returns the server-generated key ID used for deletion.\n\nThe \`userId\` must be the authenticated API user\'s own ID. Registering a key for another user is not supported and is rejected.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin.\n\nOperation ID: createApprovalKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/createApprovalKey'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The ID of the API user to register the approval key for.',
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
  static path = '/v1/management/api_users/{userId}/approval_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateApprovalKey)

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
    pathParams['userId'] = String(flags['user-id'])


    await this.confirmOrAbort('POST', '/v1/management/api_users/{userId}/approval_keys')

    const result = await this.makeRequest(
      'POST',
      '/v1/management/api_users/{userId}/approval_keys',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
