import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetTRLinkTransactionTravelRuleMessageId extends FireblocksBaseCommand {
  static summary = 'Set transaction travel rule message ID'

  static description = 'Associates a Travel Rule Message ID with a Fireblocks transaction. This links the TRM compliance data to the blockchain transaction.\n\nOperation ID: setTRLinkTransactionTravelRuleMessageId\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/setTRLinkTransactionTravelRuleMessageId'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'Fireblocks transaction unique identifier',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/trlink/transaction/{txId}/travel_rule_message_id'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetTRLinkTransactionTravelRuleMessageId)

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/screening/trlink/transaction/{txId}/travel_rule_message_id')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/trlink/transaction/{txId}/travel_rule_message_id',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
