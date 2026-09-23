import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApprovalKeys extends FireblocksBaseCommand {
  static summary = 'List approval keys'

  static description = 'List the approval public keys registered for the specified API user.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin, Security Auditor.\n\nOperation ID: getApprovalKeys\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/getApprovalKeys'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The ID of the API user whose approval keys to list.',
      required: true,
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page. Maximum 15. Defaults to 10.',
      default: 10,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor returned from the previous response (the \`next\` field) to fetch the next page.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/api_users/{userId}/approval_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApprovalKeys)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['userId'] = String(flags['user-id'])

    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/management/api_users/{userId}/approval_keys',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
