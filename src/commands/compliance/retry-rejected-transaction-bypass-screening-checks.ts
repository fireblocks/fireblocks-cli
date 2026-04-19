import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RetryRejectedTransactionBypassScreeningChecks extends FireblocksBaseCommand {
  static summary = 'Calling the "Bypass Screening Policy" API endpoint triggers a new transaction, with the API user as the initiator, bypassing the screening policy check'

  static description = 'This endpoint is restricted to Admin API users and is only applicable to outgoing transactions.\n\nOperation ID: retryRejectedTransactionBypassScreeningChecks\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/retryRejectedTransactionBypassScreeningChecks'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The transaction id that was rejected by screening checks',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/transaction/{txId}/bypass_screening_policy'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RetryRejectedTransactionBypassScreeningChecks)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['txId'] = String(flags['tx-id'])


    await this.confirmOrAbort('POST', '/v1/screening/transaction/{txId}/bypass_screening_policy')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/transaction/{txId}/bypass_screening_policy',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
