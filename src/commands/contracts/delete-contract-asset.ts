import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteContractAsset extends FireblocksBaseCommand {
  static summary = 'Delete an asset from a whitelisted contract'

  static description = 'Deletes a whitelisted contract asset by ID. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: deleteContractAsset\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contracts/deleteContractAsset'

  static enableJsonFlag = false

  static flags = {
    'contract-id': Flags.string({
      description: 'The ID of the contract',
      required: true,
    }),
    'asset-id': Flags.string({
      description: 'The ID of the asset to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/contracts/{contractId}/{assetId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteContractAsset)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractId'] = String(flags['contract-id'])
    pathParams['assetId'] = String(flags['asset-id'])


    await this.confirmOrAbort('DELETE', '/v1/contracts/{contractId}/{assetId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/contracts/{contractId}/{assetId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
