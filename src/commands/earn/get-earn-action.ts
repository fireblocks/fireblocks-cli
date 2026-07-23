import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetEarnAction extends FireblocksBaseCommand {
  static summary = 'Get a single earn lending action'

  static description = 'Returns one lending action by its action sequence id (tenant-scoped).\n\nOperation ID: getEarnAction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Earn/getEarnAction'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'Action sequence id (UUID).',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/earn/actions/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetEarnAction)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/earn/actions/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
