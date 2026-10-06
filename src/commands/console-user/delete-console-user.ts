import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteConsoleUser extends FireblocksBaseCommand {
  static summary = 'Request deletion of a console user'

  static description = 'Requests deletion of a console user. The request is asynchronous: it goes through the workspace\'s configured "Delete users" approval policy (Settings > Quorums), exactly as deleting a user from the console does, and the user is removed only once that approval completes.\n- Track progress by polling GET /management/users; deletion is complete when the user is disabled.\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin/Security Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin, Security Admin.\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: deleteConsoleUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Console%20User/deleteConsoleUser'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID of the console user to delete',
      required: true,
    }),
    'force': Flags.boolean({
      description: 'Acknowledges the impact of removing this user and proceeds anyway. Overrides both USER_REFERENCED_IN_TAP and QUORUM_INTEGRITY, the same way the acknowledgement checkbox does in the console.',
      default: false,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/management/users/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteConsoleUser)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])

    const queryParams: Record<string, string> = {}
    if (flags['force'] !== undefined && flags['force'] !== null) {
      queryParams['force'] = String(flags['force'])
    }

    await this.confirmOrAbort('DELETE', '/v1/management/users/{id}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/management/users/{id}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
