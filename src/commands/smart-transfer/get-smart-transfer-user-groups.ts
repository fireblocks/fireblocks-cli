import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetSmartTransferUserGroups extends FireblocksBaseCommand {
  static summary = 'Get user group'

  static description = 'Get Smart Transfer user groups.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getSmartTransferUserGroups\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/getSmartTransferUserGroups'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/smart-transfers/settings/user-groups'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetSmartTransferUserGroups)


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/smart-transfers/settings/user-groups',
      {
        headers,
      },
    )

    return result
  }
}
