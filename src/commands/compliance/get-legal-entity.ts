import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetLegalEntity extends FireblocksBaseCommand {
  static summary = 'Get a legal entity'

  static description = 'Returns details of a specific legal entity registration, including GLEIF data when available.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getLegalEntity\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/getLegalEntity'

  static enableJsonFlag = false

  static flags = {
    'legal-entity-id': Flags.string({
      description: 'The unique ID of the legal entity registration',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/legal_entities/{legalEntityId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetLegalEntity)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['legalEntityId'] = String(flags['legal-entity-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/legal_entities/{legalEntityId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
