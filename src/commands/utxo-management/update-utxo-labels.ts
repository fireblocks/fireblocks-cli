import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateUtxoLabels extends FireblocksBaseCommand {
  static summary = 'Attach or detach labels to/from UTXOs'

  static description = 'Attach or detach labels to/from UTXOs in a vault account. Labels can be used for organizing and filtering UTXOs.\nLabels are applied additively — \`labelsToAttach\` adds to the existing label set and \`labelsToDetach\` removes from it. Neither operation replaces the full set.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: updateUtxoLabels\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/UTXO%20Management/updateUtxoLabels'

  static enableJsonFlag = false

  static flags = {
    'vault-account-id': Flags.string({
      description: 'The ID of the vault account',
      required: true,
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

  static method = 'PATCH'
  static path = '/v1/utxo_management/{vaultAccountId}/{assetId}/labels'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateUtxoLabels)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

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
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('PATCH', '/v1/utxo_management/{vaultAccountId}/{assetId}/labels')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/utxo_management/{vaultAccountId}/{assetId}/labels',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
