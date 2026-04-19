import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class Stake extends FireblocksBaseCommand {
  static summary = 'Initiate or add to existing stake'

  static description = 'Creates a new staking position and returns its unique ID. For Ethereum compounding validator (EIP-7251): when the \'id\' of an existing compounding validator position is provided, adds to that position; otherwise creates a new position. For Ethereum legacy validator: creates a new position regardless of existing delegations. For Cosmos chains and Ethereum liquid staking (Lido): automatically add to existing positions for the same validator provider and same vault account if one exists, otherwise create a new position. For Solana and Polygon: always create new positions regardless of existing delegations.\n\nOperation ID: stake\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Staking/stake'

  static enableJsonFlag = false

  static flags = {
    'chain-descriptor': Flags.string({
      description: 'Protocol identifier for the stake staking operation (e.g., ATOM_COS/AXL/CELESTIA).',
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
  static path = '/v1/staking/chains/{chainDescriptor}/stake'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(Stake)

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
    pathParams['chainDescriptor'] = String(flags['chain-descriptor'])


    await this.confirmOrAbort('POST', '/v1/staking/chains/{chainDescriptor}/stake')

    const result = await this.makeRequest(
      'POST',
      '/v1/staking/chains/{chainDescriptor}/stake',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
