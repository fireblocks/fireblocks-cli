import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTRLinkIntegration extends FireblocksBaseCommand {
  static summary = 'Create customer integration'

  static description = 'Creates a new TRSupport integration for a customer. This establishes a connection placeholder between a customer and a Travel Rule partner. Use the connect endpoint to provide credentials after creation. You may optionally supply \`customerIntegrationId\` in the request body when your tenant is enabled for client-provided integration ids.\n\nOperation ID: createTRLinkIntegration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/createTRLinkIntegration'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/trlink/customers/integration'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTRLinkIntegration)

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



    await this.confirmOrAbort('POST', '/v1/screening/trlink/customers/integration')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/trlink/customers/integration',
      {
        body,
        headers,
      },
    )

    return result
  }
}
