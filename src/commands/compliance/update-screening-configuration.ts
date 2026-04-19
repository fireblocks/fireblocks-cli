import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateScreeningConfiguration extends FireblocksBaseCommand {
  static summary = 'Tenant - Screening Configuration'

  static description = 'Update tenant screening configuration.\n\nOperation ID: updateScreeningConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/updateScreeningConfiguration'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'PUT'
  static path = '/v1/screening/configurations'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateScreeningConfiguration)

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



    await this.confirmOrAbort('PUT', '/v1/screening/configurations')

    const result = await this.makeRequest(
      'PUT',
      '/v1/screening/configurations',
      {
        body,
        headers,
      },
    )

    return result
  }
}
