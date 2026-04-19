import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDeployableAddress extends FireblocksBaseCommand {
  static summary = 'Get deterministic address for contract deployment'

  static description = 'Get a deterministic address for contract deployment. The address is derived from the contract\'s bytecode and  provided salt. This endpoint is used to get the address of a contract that will be deployed in the future.\n\nOperation ID: getDeployableAddress\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tokenization/getDeployableAddress'

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
  static path = '/v1/tokenization/multichain/deterministic_address'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDeployableAddress)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/multichain/deterministic_address')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/multichain/deterministic_address',
      {
        body,
        headers,
      },
    )

    return result
  }
}
