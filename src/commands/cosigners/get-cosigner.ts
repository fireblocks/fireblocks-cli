import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCosigner extends FireblocksBaseCommand {
  static summary = 'Get cosigner'

  static description = 'Get a cosigner by ID.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: getCosigner\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/getCosigner'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/cosigners/{cosignerId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCosigner)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/cosigners/{cosignerId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
