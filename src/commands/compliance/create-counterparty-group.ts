import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateCounterpartyGroup extends FireblocksBaseCommand {
  static summary = 'Create a counterparty group'

  static description = 'Creates a new counterparty group.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin.\n\nOperation ID: createCounterpartyGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/createCounterpartyGroup'

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
  static path = '/v1/counterparty_groups'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateCounterpartyGroup)

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



    await this.confirmOrAbort('POST', '/v1/counterparty_groups')

    const result = await this.makeRequest(
      'POST',
      '/v1/counterparty_groups',
      {
        body,
        headers,
      },
    )

    return result
  }
}
