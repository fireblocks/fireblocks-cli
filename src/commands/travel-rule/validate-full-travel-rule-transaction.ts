import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ValidateFullTravelRuleTransaction extends FireblocksBaseCommand {
  static summary = 'Validate Full Travel Rule Transaction'

  static description = 'Validate Full Travel Rule transactions.\n\nChecks for all required information on the originator and beneficiary VASPs.\n\nOperation ID: validateFullTravelRuleTransaction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Travel%20Rule/validateFullTravelRuleTransaction'

  static enableJsonFlag = false

  static flags = {
    'notation': Flags.string({
      description: 'Specifies the notation of the transaction. Possible values are: - \`notabene\`: Uses Notabene notation (default behavior). - \`fireblocks\`: Uses Fireblocks notation, with automatic translation of asset tickers and amounts. - \`<none>\`: Defaults to \`notabene\` for backward compatibility.\n**Note:** The default value for the \`notation\` parameter will change from \`notabene\` to \`fireblocks\` Update your integrations accordingly.',
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
  static path = '/v1/screening/travel_rule/transaction/validate/full'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ValidateFullTravelRuleTransaction)

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


    const queryParams: Record<string, string> = {}
    if (flags['notation'] !== undefined && flags['notation'] !== null) {
      queryParams['notation'] = String(flags['notation'])
    }

    await this.confirmOrAbort('POST', '/v1/screening/travel_rule/transaction/validate/full')

    const result = await this.makeRequest(
      'POST',
      '/v1/screening/travel_rule/transaction/validate/full',
      {
        body,
        headers,
        queryParams,
      },
    )

    return result
  }
}
