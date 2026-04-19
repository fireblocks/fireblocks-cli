import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ResetDevice extends FireblocksBaseCommand {
  static summary = 'Resets device'

  static description = 'Resets mobile device for given console user, that user will need to do mobile onboarding again.\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: resetDevice\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Reset%20device/resetDevice'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID of the console user',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/management/users/{id}/reset_device'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ResetDevice)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('POST', '/v1/management/users/{id}/reset_device')

    const result = await this.makeRequest(
      'POST',
      '/v1/management/users/{id}/reset_device',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
