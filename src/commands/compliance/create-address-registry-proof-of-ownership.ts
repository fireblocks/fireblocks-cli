import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateAddressRegistryProofOfOwnership extends FireblocksBaseCommand {
  static summary = 'Create a Proof of Ownership PDF for an address'

  static description = 'Creates a Proof of Ownership PDF for a blockchain address owned by the authenticated workspace — for example, to share with a counterparty or bank as compliance evidence. Recipients can confirm it with \`POST /v1/address_registry/proof_of_ownership_exports/verify\`.\n\nCheck \`proofOfOwnershipAvailable\` on \`GET /v1/address_registry/legal_entities/{address}\` first if you want to know whether create is likely to succeed.\n\nOperation ID: createAddressRegistryProofOfOwnership\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/createAddressRegistryProofOfOwnership'

  static enableJsonFlag = false

  static flags = {
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
  static path = '/v1/address_registry/proof_of_ownership_exports'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateAddressRegistryProofOfOwnership)

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



    await this.confirmOrAbort('POST', '/v1/address_registry/proof_of_ownership_exports')

    const result = await this.makeRequest(
      'POST',
      '/v1/address_registry/proof_of_ownership_exports',
      {
        body,
        headers,
      },
    )

    return result
  }
}
