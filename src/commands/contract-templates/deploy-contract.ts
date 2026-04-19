import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DeployContract extends FireblocksBaseCommand {
  static summary = 'Deploy contract'

  static description = 'Deploy a new contract by contract template id. If you wish to deploy a token (ERC20, ERC721 etc), and create asset please use POST /tokenization\n\nOperation ID: deployContract\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contract%20Templates/deployContract'

  static enableJsonFlag = false

  static flags = {
    'contract-template-id': Flags.string({
      description: 'The Contract Template identifier',
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
  static path = '/v1/tokenization/templates/{contractTemplateId}/deploy'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DeployContract)

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
    pathParams['contractTemplateId'] = String(flags['contract-template-id'])


    await this.confirmOrAbort('POST', '/v1/tokenization/templates/{contractTemplateId}/deploy')

    const result = await this.makeRequest(
      'POST',
      '/v1/tokenization/templates/{contractTemplateId}/deploy',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
