import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateAssetUserMetadata extends FireblocksBaseCommand {
  static summary = 'Update the user’s metadata for an asset'

  static description = 'Update the user’s metadata for an asset.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, NCW Admin, Signer, Editor.\n\nOperation ID: updateAssetUserMetadata\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Blockchains%20%26%20assets/updateAssetUserMetadata'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The ID or legacyId of the asset',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PATCH'
  static path = '/v1/assets/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateAssetUserMetadata)

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
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('PATCH', '/v1/assets/{id}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/assets/{id}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
