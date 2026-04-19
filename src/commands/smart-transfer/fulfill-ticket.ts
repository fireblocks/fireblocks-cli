import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FulfillTicket extends FireblocksBaseCommand {
  static summary = 'Fund ticket manually'

  static description = 'Manually fulfill ticket, in case when all terms (legs) are funded manually. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: fulfillTicket\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/fulfillTicket'

  static enableJsonFlag = false

  static flags = {
    'ticket-id': Flags.string({
      description: 'The ticketId parameter',
      required: true,
    }),
  }

  static method = 'PUT'
  static path = '/v1/smart-transfers/{ticketId}/fulfill'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FulfillTicket)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])


    await this.confirmOrAbort('PUT', '/v1/smart-transfers/{ticketId}/fulfill')

    const result = await this.makeRequest(
      'PUT',
      '/v1/smart-transfers/{ticketId}/fulfill',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
