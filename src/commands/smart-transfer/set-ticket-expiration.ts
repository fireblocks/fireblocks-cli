import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetTicketExpiration extends FireblocksBaseCommand {
  static summary = 'Set expiration'

  static description = 'Set expiration date on Smart Transfer ticket. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: setTicketExpiration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/setTicketExpiration'

  static enableJsonFlag = false

  static flags = {
    'ticket-id': Flags.string({
      description: 'The ticketId parameter',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'PUT'
  static path = '/v1/smart-transfers/{ticketId}/expires-in'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetTicketExpiration)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['ticketId'] = String(flags['ticket-id'])


    await this.confirmOrAbort('PUT', '/v1/smart-transfers/{ticketId}/expires-in')

    const result = await this.makeRequest(
      'PUT',
      '/v1/smart-transfers/{ticketId}/expires-in',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
