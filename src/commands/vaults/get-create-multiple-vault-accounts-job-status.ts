import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetCreateMultipleVaultAccountsJobStatus extends FireblocksBaseCommand {
  static summary = 'Get job status of bulk creation of new vault accounts'

  static description = 'Returns the current status of (or error for) the specified vault account bulk creation job.\n\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: getCreateMultipleVaultAccountsJobStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getCreateMultipleVaultAccountsJobStatus'

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
  static path = '/v1/vault/accounts/bulk/{jobId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetCreateMultipleVaultAccountsJobStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['jobId'] = String(flags['job-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/vault/accounts/bulk/{jobId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
