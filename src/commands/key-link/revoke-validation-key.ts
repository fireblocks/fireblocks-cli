import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RevokeValidationKey extends FireblocksBaseCommand {
  static summary = 'Revokes a validation key'

  static description = 'Revokes a validation key, making it permanently unusable for validation. Once revoked, a key cannot be un-revoked. Another key has to be used for future validations.\n\nOperation ID: revokeValidationKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/revokeValidationKey'

  static enableJsonFlag = false

  static flags = {
    'key-id': Flags.string({
      description: 'The unique identifier for the validation key provided by Fireblocks',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/key_link/validation_keys/{keyId}/revoke'
  static operationId = 'revokeValidationKey'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RevokeValidationKey)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['keyId'] = String(flags['key-id'])


    await this.confirmOrAbort('POST', '/v1/key_link/validation_keys/{keyId}/revoke')

    const result = await this.makeRequest(
      'POST',
      '/v1/key_link/validation_keys/{keyId}/revoke',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
