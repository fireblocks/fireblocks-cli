import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetConnectedAccount extends FireblocksBaseCommand {
  static summary = 'Get connected account'

  static description = 'Retrieve detailed information about a specific connected account by ID.\n\nOperation ID: getConnectedAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/getConnectedAccount'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the account to fetch.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/connected_accounts/{accountId}'
  static operationId = 'getConnectedAccount'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetConnectedAccount)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/connected_accounts/{accountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
