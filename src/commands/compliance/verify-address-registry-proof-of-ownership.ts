import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class VerifyAddressRegistryProofOfOwnership extends FireblocksBaseCommand {
  static summary = 'Verify a Proof of Ownership export'

  static description = 'Verifies a Proof of Ownership export against the record Fireblocks stored at creation. Returns \`valid: false\` (not 404) for an unknown, expired, or mismatched export. Available to any authenticated Fireblocks workspace, not just the export\'s original owner.\n\nOperation ID: verifyAddressRegistryProofOfOwnership\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Compliance/verifyAddressRegistryProofOfOwnership'

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
  static path = '/v1/address_registry/proof_of_ownership_exports/verify'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(VerifyAddressRegistryProofOfOwnership)

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



    await this.confirmOrAbort('POST', '/v1/address_registry/proof_of_ownership_exports/verify')

    const result = await this.makeRequest(
      'POST',
      '/v1/address_registry/proof_of_ownership_exports/verify',
      {
        body,
        headers,
      },
    )

    return result
  }
}
