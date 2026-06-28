import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class IssueApiUserPairingToken extends FireblocksBaseCommand {
  static summary = 'Issue API user pairing token'

  static description = 'Issues a device pairing token for the given user and returns the user\'s info along with the token.\n- The API user must be in PENDING_ACTIVATION status. If the user is already set up (enabled), the request is rejected with a 409 Conflict.\n- Please note that this endpoint is available only for API keys with Owner/Admin/Non Signing Admin permissions.\nEndpoint Permission: Owner, Admin, Non-Signing Admin.\n\nOperation ID: issueApiUserPairingToken\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Api%20User/issueApiUserPairingToken'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The ID of the api user',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/management/api_users/{userId}/pairing_token'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(IssueApiUserPairingToken)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['userId'] = String(flags['user-id'])


    await this.confirmOrAbort('POST', '/v1/management/api_users/{userId}/pairing_token')

    const result = await this.makeRequest(
      'POST',
      '/v1/management/api_users/{userId}/pairing_token',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
