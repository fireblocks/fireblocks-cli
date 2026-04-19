import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FindTicketTermById extends FireblocksBaseCommand {
  static summary = 'Get Smart Transfer ticket term'

  static description = 'Find a specific term of a specific Smart Transfer ticket. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: findTicketTermById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/findTicketTermById'

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

  static method = 'GET'
  static path = '/v1/smart-transfers/{ticketId}/terms/{termId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FindTicketTermById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])
    pathParams['termId'] = String(flags['term-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/smart-transfers/{ticketId}/terms/{termId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
