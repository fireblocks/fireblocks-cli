import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTicketTerm extends FireblocksBaseCommand {
  static summary = 'Create leg (term)'

  static description = 'Creates new smart transfer ticket term (when the ticket status is DRAFT). Learn more about Fireblocks Smart Transfers in the following [guide](https://developers.fireblocks.com/docs/execute-smart-transfers). Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createTicketTerm\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/createTicketTerm'

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

  static method = 'POST'
  static path = '/v1/smart-transfers/{ticketId}/terms'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTicketTerm)

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


    await this.confirmOrAbort('POST', '/v1/smart-transfers/{ticketId}/terms')

    const result = await this.makeRequest(
      'POST',
      '/v1/smart-transfers/{ticketId}/terms',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
