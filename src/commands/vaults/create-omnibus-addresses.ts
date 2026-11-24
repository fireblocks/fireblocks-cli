import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateOmnibusAddresses extends FireblocksBaseCommand {
  static summary = 'Create omnibus deposit addresses'

  static description = 'Creates a batch of deposit addresses for the omnibus account of the given vault account, protocol and asset.\n**Note:** This endpoint is currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: createOmnibusAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/createOmnibusAddresses'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the omnibus vault account',
      required: true,
    }),
    'protocol': Flags.string({
      description: 'The omnibus protocol',
      required: true,
      options: ['EVM', 'TEMPO'],
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset',
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
  static path = '/v1/vault/accounts/{vaultAccountId}/omnibus/{protocol}/{assetId}/addresses/bulk'
  static operationId = 'createOmnibusAddresses'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateOmnibusAddresses)

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
    pathParams['vaultAccountId'] = String(flags['vault-account-id'])
    pathParams['protocol'] = String(flags['protocol'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('POST', '/v1/vault/accounts/{vaultAccountId}/omnibus/{protocol}/{assetId}/addresses/bulk')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/{vaultAccountId}/omnibus/{protocol}/{assetId}/addresses/bulk',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
