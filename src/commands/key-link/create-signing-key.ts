import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateSigningKey extends FireblocksBaseCommand {
  static summary = 'Add a new signing key'

  static description = 'Adds a new signing key to the workspace. The added key will be linked to the specific Fireblocks agent user ID. The same user will receive the proof of ownership message to be signed, and upon successful proof, the key will become enabled.\n\nOperation ID: createSigningKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/createSigningKey'

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
  static path = '/v1/key_link/signing_keys'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateSigningKey)

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



    await this.confirmOrAbort('POST', '/v1/key_link/signing_keys')

    const result = await this.makeRequest(
      'POST',
      '/v1/key_link/signing_keys',
      {
        body,
        headers,
      },
    )

    return result
  }
}
