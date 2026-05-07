import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteCounterpartyGroup extends FireblocksBaseCommand {
  static summary = 'Delete a counterparty group'

  static description = 'Permanently deletes a counterparty group.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin.\n\nOperation ID: deleteCounterpartyGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/deleteCounterpartyGroup'

  static enableJsonFlag = false

  static flags = {
    'group-id': Flags.string({
      description: 'The unique identifier of the counterparty group',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/counterparty_groups/{groupId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteCounterpartyGroup)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['groupId'] = String(flags['group-id'])


    await this.confirmOrAbort('DELETE', '/v1/counterparty_groups/{groupId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/counterparty_groups/{groupId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
