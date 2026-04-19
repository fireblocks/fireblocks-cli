import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateLegalEntity extends FireblocksBaseCommand {
  static summary = 'Update legal entity'

  static description = 'Updates the status of a legal entity registration. Setting isDefault to true marks the registration as the workspace default, which is applied to vault accounts that have no explicit legal entity mapping.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: updateLegalEntity\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/updateLegalEntity'

  static enableJsonFlag = false

  static flags = {
    'legal-entity-id': Flags.string({
      description: 'The unique ID of the legal entity registration',
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
  static path = '/v1/legal_entities/{legalEntityId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateLegalEntity)

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
    pathParams['legalEntityId'] = String(flags['legal-entity-id'])


    await this.confirmOrAbort('PUT', '/v1/legal_entities/{legalEntityId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/legal_entities/{legalEntityId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
