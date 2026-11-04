import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTRLinkManualDecision extends FireblocksBaseCommand {
  static summary = 'Get manual decision for missing TRM'

  static description = 'Returns the current manual missing-TRM decision for a transaction. Use to follow a decision that is not yet applied, or to check status at any time.\n\nOperation ID: getTRLinkManualDecision\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/getTRLinkManualDecision'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'tx-id': Flags.string({
      description: 'Fireblocks transaction unique identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}/transactions/{txId}/manual_decision'
  static operationId = 'getTRLinkManualDecision'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTRLinkManualDecision)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])
    pathParams['txId'] = String(flags['tx-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}/transactions/{txId}/manual_decision',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
