import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetResendByQueryJobStatus extends FireblocksBaseCommand {
  static summary = 'Get resend by query job status'

  static description = 'Get the status of a resend by query job\n\nOperation ID: getResendByQueryJobStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getResendByQueryJobStatus'

  static enableJsonFlag = false

  static flags = {
    'webhook-id': Flags.string({
      description: 'The ID of the webhook',
      required: true,
    }),
    'job-id': Flags.string({
      description: 'The ID of the resend job',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/webhooks/{webhookId}/notifications/resend_by_query/jobs/{jobId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetResendByQueryJobStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['jobId'] = String(flags['job-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/notifications/resend_by_query/jobs/{jobId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
