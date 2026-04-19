import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApprovalRequest extends FireblocksBaseCommand {
  static summary = 'Get an approval request by id'

  static description = 'Get an approval request by id\n\nOperation ID: getApprovalRequest\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/getApprovalRequest'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'The id parameter',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tags/approval_requests/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApprovalRequest)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['id'] = String(flags['id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/tags/approval_requests/{id}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
