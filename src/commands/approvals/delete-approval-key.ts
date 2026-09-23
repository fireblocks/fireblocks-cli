import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteApprovalKey extends FireblocksBaseCommand {
  static summary = 'Delete an approval key'

  static description = 'Delete (revoke) an approval public key for the specified API user. Revoking the last key disables the API user\'s ability to sign approvals.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin.\n\nOperation ID: deleteApprovalKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/deleteApprovalKey'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The ID of the API user whose approval key to delete.',
      required: true,
    }),
    'key-id': Flags.string({
      description: 'The ID of the approval key to delete.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/management/api_users/{userId}/approval_keys/{keyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteApprovalKey)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['userId'] = String(flags['user-id'])
    pathParams['keyId'] = String(flags['key-id'])


    await this.confirmOrAbort('DELETE', '/v1/management/api_users/{userId}/approval_keys/{keyId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/management/api_users/{userId}/approval_keys/{keyId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
