import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetVaultAssetUtxoSelectionConfig extends FireblocksBaseCommand {
  static summary = 'Get vault and asset UTXO selection config'

  static description = 'Returns the config stored at this vault-and-asset scope, if any, and the effective strategy after workspace fallback and runtime resolution. \`ADAPTIVE\` is the recommended strategy. When no row is stored at this scope and none is inherited from the workspace (source \`DEFAULT\`), \`effective\` is \`ADAPTIVE\` if adaptive selection is serving for this scope, otherwise \`ASC\`.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getVaultAssetUtxoSelectionConfig\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/UTXO%20Management/getVaultAssetUtxoSelectionConfig'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/utxo_management/{vaultAccountId}/{assetId}/selection_config'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetVaultAssetUtxoSelectionConfig)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/utxo_management/{vaultAccountId}/{assetId}/selection_config',
      {
        headers,
      },
    )

    return result
  }
}
