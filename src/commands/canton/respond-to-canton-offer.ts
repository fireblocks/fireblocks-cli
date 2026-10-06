import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RespondToCantonOffer extends FireblocksBaseCommand {
  static summary = 'Answer an offer'

  static description = 'ONE endpoint for every offer. \`responseType\` selects the variant, and \`payload\` carries that variant\'s arguments — the same \`{discriminator, payload}\` shape \`/calls\` uses. The union is closed, so an unknown \`responseType\` is a \`400\`.\n{"responseType":"DTCC_END_INVESTOR_ONBOARDING_REJECT","payload":{"reason":"KYC"}} {"responseType":"ALLOCATION_ACCEPT"}\n\`payload\` appears ONLY on the variants that take arguments. A variant with no arguments has no \`payload\` property at all, rather than an empty object — so the schema says what the ledger says, and a future type that needs fields declares its own instead of widening this envelope.\n\`responseType\` is a direct copy of a value the caller already read off the offer, in \`cantonDetails.offerResponse.availableResponses\`. Both sides share one flat vocabulary, so there is nothing to translate; the previous shape required pairing that value with a matching \`domain\` string, which carried no information \`responseType\` did not already determine.\n\nOperation ID: respondToCantonOffer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Canton/respondToCantonOffer'

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
