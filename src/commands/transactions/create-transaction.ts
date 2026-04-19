import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTransaction extends FireblocksBaseCommand {
  static summary = 'Create a new transaction'

  static description = 'Creates a new transaction. This endpoint can be used for regular Transfers, Contract Calls, Raw & Typed message signing. - For Transfers, the required parameters are: \`assetId\`, \`source\`, \`destination\` and \`amount\`. - For Contract Calls, the required parameters are: \`operation.CONTRACT_CALL\`, \`assetId\` (Base Asset), \`source\`,\n\nOperation ID: createTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Transactions/createTransaction'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/transactions'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTransaction)

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



    await this.confirmOrAbort('POST', '/v1/transactions')

    const result = await this.makeRequest(
      'POST',
      '/v1/transactions',
      {
        body,
        headers,
      },
    )

    return result
  }
}
