import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateTRLinkCustomer extends FireblocksBaseCommand {
  static summary = 'Update customer'

  static description = 'Updates an existing customer\'s information. All fields are optional - only provided fields will be updated.\n\nOperation ID: updateTRLinkCustomer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/updateTRLinkCustomer'

  static enableJsonFlag = false

  static flags = {
    'customer-id': Flags.string({
      description: 'Customer unique identifier',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PUT'
  static path = '/v1/screening/trlink/customers/{customerId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateTRLinkCustomer)

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
    pathParams['customerId'] = String(flags['customer-id'])


    await this.confirmOrAbort('PUT', '/v1/screening/trlink/customers/{customerId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/trlink/customers/{customerId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
