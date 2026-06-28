import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteLegalEntity extends FireblocksBaseCommand {
  static summary = 'Delete a legal entity'

  static description = 'Delete a legal entity will change the status of a legal entity registration to REVOKED. Endpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: deleteLegalEntity\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/deleteLegalEntity'

  static enableJsonFlag = false

  static flags = {
    'legal-entity-id': Flags.string({
      description: 'The unique ID of the legal entity registration to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/legal_entities/{legalEntityId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteLegalEntity)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['legalEntityId'] = String(flags['legal-entity-id'])


    await this.confirmOrAbort('DELETE', '/v1/legal_entities/{legalEntityId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/legal_entities/{legalEntityId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
