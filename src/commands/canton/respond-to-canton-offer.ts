import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RespondToCantonOffer extends FireblocksBaseCommand {
  static summary = 'Answer an offer'

  static description = 'Responds to an incoming Canton offer. Set \`responseType\` to one of the values in the offer transaction\'s \`cantonDetails.offerResponse.availableResponses\`.\n\nOperation ID: respondToCantonOffer\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Canton/respondToCantonOffer'

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
  static operationId = 'respondToCantonOffer'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RespondToCantonOffer)

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
