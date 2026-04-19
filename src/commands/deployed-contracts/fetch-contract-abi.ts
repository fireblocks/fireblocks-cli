import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class FetchContractAbi extends FireblocksBaseCommand {
  static summary = 'Fetch the contract ABI'

  static description = 'Fetch the ABI. If not found fetch the ABI from the block explorer\n\nOperation ID: fetchContractAbi\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Deployed%20Contracts/fetchContractAbi'

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
  static path = '/v1/tokenization/contracts/fetch_abi'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(FetchContractAbi)

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



    await this.confirmOrAbort('POST', '/v1/tokenization/contracts/fetch_abi')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/contracts/fetch_abi',
      {
        body,
        headers,
      },
    )

    return result
  }
}
