import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetAsset extends FireblocksBaseCommand {
  static summary = 'Get an asset'

  static description = 'Returns an asset by ID or legacyID.\n\n**Note**:\n\n  - We will continue displaying and supporting the legacy ID (API ID). Since not all Fireblocks services fully support the new Assets UUID, please use only the legacy ID until further notice.\n\nOperation ID: getAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/getAsset'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID or legacyId of the asset',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/assets/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetAsset)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/assets/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
