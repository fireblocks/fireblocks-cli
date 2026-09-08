import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RespondToCantonOffer extends FireblocksBaseCommand {
  static summary = 'Answer an offer'

  static description = 'ONE endpoint for every offer domain. Two layers of discrimination, nested: \`domain\` selects \`response\`, and inside \`response\` the \`responseType\` selects the variant. Both layers are closed, so an onboarding response type sent under \`domain: ALLOCATIONS\` is a \`400\`.\n{"domain":"ONBOARDING","response":{"responseType":"DTCC_…_REJECT","reason":"KYC"}}\n\`domain: TRANSFERS\` is declared so the endpoint covers every offer domain. Transfer responses are not available yet — the domain is part of the contract, not of v1\'s behaviour.\n\nOperation ID: respondToCantonOffer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Canton/respondToCantonOffer'

  static enableJsonFlag = false

  static flags = {
    'offer-id': Flags.string({
      description: 'The Fireblocks transaction id of the incoming offer being answered.',
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
  static path = '/v1/operations/canton/offers/{offerId}/responses'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RespondToCantonOffer)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

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
    pathParams['offerId'] = String(flags['offer-id'])


    await this.confirmOrAbort('POST', '/v1/operations/canton/offers/{offerId}/responses')

    const result = await this.makeRequest(
      'POST',
      '/v1/operations/canton/offers/{offerId}/responses',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
