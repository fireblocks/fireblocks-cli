import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RemoveTicketTerm extends FireblocksBaseCommand {
  static summary = 'Delete ticket leg (term)'

  static description = 'Delete ticket term when ticket is in DRAFT status\n\nOperation ID: removeTicketTerm\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/removeTicketTerm'

  static enableJsonFlag = false

  static flags = {
    'ticket-id': Flags.string({
      description: 'The ticketId parameter',
      required: true,
    }),
    'term-id': Flags.string({
      description: 'The termId parameter',
      required: true,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/smart-transfers/{ticketId}/terms/{termId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RemoveTicketTerm)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])
    pathParams['termId'] = String(flags['term-id'])


    await this.confirmOrAbort('DELETE', '/v1/smart-transfers/{ticketId}/terms/{termId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/smart-transfers/{ticketId}/terms/{termId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
