import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AssignVaultsToLegalEntity extends FireblocksBaseCommand {
  static summary = 'Assign vault accounts to a legal entity'

  static description = 'Assigns one or more vault accounts to a specific legal entity registration. Explicitly mapped vault accounts take precedence over the workspace default legal entity.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: assignVaultsToLegalEntity\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/assignVaultsToLegalEntity'

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

  static method = 'POST'
  static path = '/v1/legal_entities/{legalEntityId}/vaults'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AssignVaultsToLegalEntity)

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


    await this.confirmOrAbort('POST', '/v1/legal_entities/{legalEntityId}/vaults')

    const result = await this.makeRequest(
      'POST',
      '/v1/legal_entities/{legalEntityId}/vaults',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
