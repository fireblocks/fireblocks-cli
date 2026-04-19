import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class PairApiKey extends FireblocksBaseCommand {
  static summary = 'Pair API key'

  static description = 'Pair an API key to a cosigner\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: pairApiKey\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/pairApiKey'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    'api-key-id': Flags.string({
      description: 'The unique identifier of the API key',
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
  static path = '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID","Location"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(PairApiKey)

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
    pathParams['cosignerId'] = String(flags['cosigner-id'])
    pathParams['apiKeyId'] = String(flags['api-key-id'])


    await this.confirmOrAbort('PUT', '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/cosigners/{cosignerId}/api_keys/{apiKeyId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
