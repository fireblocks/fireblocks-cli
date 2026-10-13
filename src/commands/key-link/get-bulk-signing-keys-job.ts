import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetBulkSigningKeysJob extends FireblocksBaseCommand {
  static summary = 'Get a bulk registration job'

  static description = 'Returns the progress and outcome of a bulk registration job. \`created + alreadyRegistered\` reaching \`total\` means every submitted key is present.\n\nOperation ID: getBulkSigningKeysJob\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/getBulkSigningKeysJob'

  static enableJsonFlag = false

  static flags = {
    'job-id': Flags.string({
      description: 'The id of the bulk registration job',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/key_link/signing_keys/bulk/jobs/{jobId}'
  static operationId = 'getBulkSigningKeysJob'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetBulkSigningKeysJob)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['jobId'] = String(flags['job-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/key_link/signing_keys/bulk/jobs/{jobId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
