import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DisableValidationKey extends FireblocksBaseCommand {
  static summary = 'Disables a validation key'

  static description = 'Allows disabling validation key even if it has not expired yet. It is not allowed to enable the validation key back. Another key has to be used for future validations.\n\nOperation ID: disableValidationKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/disableValidationKey'

  static enableJsonFlag = false

  static flags = {
    'key-id': Flags.string({
      description: 'The unique identifier for the validation key provided by Fireblocks',
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

  static method = 'PATCH'
  static path = '/v1/key_link/validation_keys/{keyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DisableValidationKey)

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

    const pathParams: Record<string, string> = {}
    pathParams['keyId'] = String(flags['key-id'])


    await this.confirmOrAbort('PATCH', '/v1/key_link/validation_keys/{keyId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/key_link/validation_keys/{keyId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
