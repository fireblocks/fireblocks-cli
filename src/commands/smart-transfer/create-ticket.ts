import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTicket extends FireblocksBaseCommand {
  static summary = 'Create Ticket'

  static description = 'Creates a new Smart Transfer ticket. Learn more about Fireblocks Smart Transfers [here](https://developers.fireblocks.com/docs/execute-smart-transfers).\n\n**Note:** The \`DVP\` value is in Early Access and should only be used if Fireblocks has enabled it in your workspace. Contact your Customer Success Manager for more information.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createTicket\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/createTicket'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/smart-transfers'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTicket)

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



    await this.confirmOrAbort('POST', '/v1/smart-transfers')

    const result = await this.makeRequest(
      'POST',
      '/v1/smart-transfers',
      {
        body,
        headers,
      },
    )

    return result
  }
}
