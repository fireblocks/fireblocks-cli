import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FindTicketById extends FireblocksBaseCommand {
  static summary = 'Search Ticket by ID'

  static description = 'Find Smart Transfer ticket by id. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: findTicketById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/findTicketById'

  static enableJsonFlag = false

  static flags = {
    'ticket-id': Flags.string({
      description: 'The ticketId parameter',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/smart-transfers/{ticketId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FindTicketById)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/smart-transfers/{ticketId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
