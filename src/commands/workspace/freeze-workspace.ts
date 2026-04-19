import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FreezeWorkspace extends FireblocksBaseCommand {
  static summary = 'Freeze'

  static description = 'Freezes a Workspace so that ALL operations by ANY user are blocked.\nYou should only perform this action when the workspace faces imminent risk, such as when you have a security breach.\nTo unfreeze a workspace, the workspace Owner must submit a request to Fireblocks Support.\n**NOTE:** \n- This operation can only be performed by the workspace Admins - Your workspace continues to receive incoming transfers during this time.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: freezeWorkspace\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Workspace/freezeWorkspace'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/workspace/freeze'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FreezeWorkspace)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/workspace/freeze')

    const result = await this.makeRequest(
      'POST',
      '/v1/workspace/freeze',
      {
        headers,
      },
    )

    return result
  }
}
