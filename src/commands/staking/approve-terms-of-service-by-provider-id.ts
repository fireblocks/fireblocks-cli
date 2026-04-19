import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ApproveTermsOfServiceByProviderId extends FireblocksBaseCommand {
  static summary = 'Approve provider terms of service'

  static description = 'Approves the provider\'s terms of service. Must be called once before performing any staking operation with this provider.\n\nOperation ID: approveTermsOfServiceByProviderId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/approveTermsOfServiceByProviderId'

  static enableJsonFlag = false

  static flags = {
    'provider-id': Flags.string({
      description: 'Unique identifier of the staking provider.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/staking/providers/{providerId}/approveTermsOfService'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ApproveTermsOfServiceByProviderId)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['providerId'] = String(flags['provider-id'])


    await this.confirmOrAbort('POST', '/v1/staking/providers/{providerId}/approveTermsOfService')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/providers/{providerId}/approveTermsOfService',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
