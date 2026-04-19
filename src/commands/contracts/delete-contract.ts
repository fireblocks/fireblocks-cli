import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeleteContract extends FireblocksBaseCommand {
  static summary = 'Delete a contract'

  static description = 'Deletes a contract by ID. Endpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: deleteContract\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contracts/deleteContract'

  static enableJsonFlag = false

  static flags = {
    'contract-id': Flags.string({
      description: 'The ID of the contract to delete',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/contracts/{contractId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeleteContract)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['contractId'] = String(flags['contract-id'])


    await this.confirmOrAbort('DELETE', '/v1/contracts/{contractId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/contracts/{contractId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
