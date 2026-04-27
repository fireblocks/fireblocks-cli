import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ApproveTermsOfService extends FireblocksBaseCommand {
  static summary = 'Approve earn provider terms of service'

  static description = 'Approves the lending provider\'s terms of service for this workspace. When\n\`isTermsApprovalRequired\` is true on the provider (see list providers),\ncall this once before creating or executing earn actions with that provider.\nAfter success, \`GET /earn/providers\` reflects \`isTermsOfServiceApproved\`.\n\n**Note:** This endpoint is currently in beta and might be subject to changes.\n\nOperation ID: approveTermsOfService\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Earn/approveTermsOfService'

  static enableJsonFlag = false

  static flags = {
    'provider-id': Flags.string({
      description: 'Stable protocol identifier for the earn provider (\`MORPHO\` or \`AAVE\`).',
      required: true,
      options: ['MORPHO', 'AAVE'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/earn/providers/{providerId}/approve_terms_of_service'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ApproveTermsOfService)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['providerId'] = String(flags['provider-id'])


    await this.confirmOrAbort('POST', '/v1/earn/providers/{providerId}/approve_terms_of_service')

    const result = await this.makeRequest(
      'POST',
      '/v1/earn/providers/{providerId}/approve_terms_of_service',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
