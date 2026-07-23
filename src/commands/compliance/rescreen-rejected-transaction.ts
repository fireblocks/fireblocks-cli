import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RescreenRejectedTransaction extends FireblocksBaseCommand {
  static summary = 'Rescreen a rejected transaction'

  static description = 'Re-runs compliance screening on an incoming transaction that was rejected or failed by screening checks, moving it back to pending screening. This endpoint is only applicable to incoming transactions with a rejected/failed AML screening status.\n\nOperation ID: rescreenRejectedTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/rescreenRejectedTransaction'

  static enableJsonFlag = false

  static flags = {
    'tx-id': Flags.string({
      description: 'The transaction id that was rejected by screening checks',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/screening/transaction/{txId}/rescreen'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RescreenRejectedTransaction)

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


    await this.confirmOrAbort('POST', '/v1/screening/transaction/{txId}/rescreen')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/transaction/{txId}/rescreen',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
