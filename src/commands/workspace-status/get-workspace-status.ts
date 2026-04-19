import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWorkspaceStatus extends FireblocksBaseCommand {
  static summary = 'Returns current workspace status'

  static description = 'Returns current workspace status (Beta).\n**Note**:\n- This endpoint is now in Beta, disabled for general availability at this time.\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\n\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getWorkspaceStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Workspace%20Status/getWorkspaceStatus'

  static enableJsonFlag = false

  static flags = {
  }

  static method = 'GET'
  static path = '/v1/management/workspace_status'
  static isBeta = true

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWorkspaceStatus)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/management/workspace_status',
      {
        headers,
      },
    )

    return result
  }
}
