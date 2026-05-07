import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateCounterpartyGroup extends FireblocksBaseCommand {
  static summary = 'Update a counterparty group'

  static description = 'Updates an existing counterparty group.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin.\n\nOperation ID: updateCounterpartyGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/updateCounterpartyGroup'

  static enableJsonFlag = false

  static flags = {
    'group-id': Flags.string({
      description: 'The unique identifier of the counterparty group',
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

  static method = 'PATCH'
  static path = '/v1/counterparty_groups/{groupId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateCounterpartyGroup)

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
    pathParams['groupId'] = String(flags['group-id'])


    await this.confirmOrAbort('PATCH', '/v1/counterparty_groups/{groupId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/counterparty_groups/{groupId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
