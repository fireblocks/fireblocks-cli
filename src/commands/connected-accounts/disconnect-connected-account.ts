import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DisconnectConnectedAccount extends FireblocksBaseCommand {
  static summary = 'Disconnect connected account'

  static description = 'Disconnect a connected account by ID. \n**Note**:\n- This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: disconnectConnectedAccount\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Connected%20Accounts/disconnectConnectedAccount'

  static enableJsonFlag = false

  static flags = {
    'account-id': Flags.string({
      description: 'The ID of the account to disconnect.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/connected_accounts/{accountId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DisconnectConnectedAccount)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['accountId'] = String(flags['account-id'])


    await this.confirmOrAbort('DELETE', '/v1/connected_accounts/{accountId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/connected_accounts/{accountId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
