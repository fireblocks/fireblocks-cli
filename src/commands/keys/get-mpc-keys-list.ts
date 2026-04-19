import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetMpcKeysList extends FireblocksBaseCommand {
  static summary = 'Get list of mpc keys'

  static description = 'Returns a list of MPC signing keys of the workspace. For each key, the list of players associated with it is attached.\n**Note:** \nThis endpoint is currently in beta and might be subject to changes.\n\nOperation ID: getMpcKeysList\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Keys/getMpcKeysList'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/keys/mpc/list'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetMpcKeysList)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/keys/mpc/list',
      {
        headers,
      },
    )

    return result
  }
}
