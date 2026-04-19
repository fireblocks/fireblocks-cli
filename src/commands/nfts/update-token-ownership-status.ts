import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateTokenOwnershipStatus extends FireblocksBaseCommand {
  static summary = 'Update token ownership status'

  static description = 'Updates token status for a tenant, in all tenant vaults.\n\nOperation ID: updateTokenOwnershipStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/NFTs/updateTokenOwnershipStatus'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'NFT ID',
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
  static path = '/v1/nfts/ownership/tokens/{id}/status'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateTokenOwnershipStatus)

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


    await this.confirmOrAbort('PUT', '/v1/nfts/ownership/tokens/{id}/status')

    const result = await this.makeRequest(
      'PUT',
      '/v1/nfts/ownership/tokens/{id}/status',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
