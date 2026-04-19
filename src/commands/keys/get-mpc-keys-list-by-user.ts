import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMpcKeysListByUser extends FireblocksBaseCommand {
  static summary = 'Get list of mpc keys by \`userId\`'

  static description = 'Returns a list of MPC signing keys of a specific user. For each key, the list of players associated with it is attached.\n**Note:**\nThis endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getMpcKeysListByUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Keys/getMpcKeysListByUser'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The id for the user',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/keys/mpc/list/{userId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMpcKeysListByUser)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['userId'] = String(flags['user-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/keys/mpc/list/{userId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
