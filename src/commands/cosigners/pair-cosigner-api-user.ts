import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class PairCosignerApiUser extends FireblocksBaseCommand {
  static summary = 'Pair API user'

  static description = 'Pair an API user to a cosigner\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: pairCosignerApiUser\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/pairCosignerApiUser'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    'api-user-id': Flags.string({
      description: 'The unique identifier of the API user',
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

  static method = 'PUT'
  static path = '/v1/cosigners/{cosignerId}/api_users/{apiUserId}'
  static operationId = 'pairCosignerApiUser'
  static isEa = false
  static responseHeaders: string[] = ["X-Request-ID","Location"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(PairCosignerApiUser)

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
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiUserId'] = String(flags['api-user-id'])


    await this.confirmOrAbort('PUT', '/v1/cosigners/{cosignerId}/api_users/{apiUserId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/cosigners/{cosignerId}/api_users/{apiUserId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
