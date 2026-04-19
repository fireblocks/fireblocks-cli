import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CancelTicket extends FireblocksBaseCommand {
  static summary = 'Cancel Ticket'

  static description = 'Cancel Smart Transfer ticket. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: cancelTicket\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/cancelTicket'

  static enableJsonFlag = false

  static flags = {
    'ticket-id': Flags.string({
      description: 'The ticketId parameter',
      required: true,
    }),
  }

  static method = 'PUT'
  static path = '/v1/smart-transfers/{ticketId}/cancel'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CancelTicket)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])


    await this.confirmOrAbort('PUT', '/v1/smart-transfers/{ticketId}/cancel')

    const result = await this.makeRequest(
      'PUT',
      '/v1/smart-transfers/{ticketId}/cancel',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
