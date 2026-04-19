import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCreateMultipleDepositAddressesJobStatus extends FireblocksBaseCommand {
  static summary = 'Get the job status of the bulk deposit address creation'

  static description = 'Returns the current status of (or an error for) the specified deposit addresss bulk creation job.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor, and Viewer.\n\nOperation ID: getCreateMultipleDepositAddressesJobStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getCreateMultipleDepositAddressesJobStatus'

  static enableJsonFlag = false

  static flags = {
    'job-id': Flags.string({
      description: 'The ID of the job to create addresses',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/accounts/addresses/bulk/{jobId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCreateMultipleDepositAddressesJobStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['jobId'] = String(flags['job-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/addresses/bulk/{jobId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
