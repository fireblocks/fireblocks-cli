import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetResendJobStatus extends FireblocksBaseCommand {
  static summary = 'Get resend job status'

  static description = 'Get the status of a resend job\n\nOperation ID: getResendJobStatus\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Webhooks%20V2/getResendJobStatus'

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
  static path = '/v1/webhooks/{webhookId}/notifications/resend_failed/jobs/{jobId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetResendJobStatus)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['webhookId'] = String(flags['webhook-id'])
    pathParams['jobId'] = String(flags['job-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/webhooks/{webhookId}/notifications/resend_failed/jobs/{jobId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
