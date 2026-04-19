import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPublicKeyInfoNcw extends FireblocksBaseCommand {
  static summary = 'Get the public key for a derivation path'

  static description = 'Gets the public key information based on derivation path and signing algorithm within a Non-Custodial Wallet\n\nOperation ID: getPublicKeyInfoNcw\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Embedded%20Wallets/getPublicKeyInfoNcw'

  static enableJsonFlag = false

  static flags = {
    'wallet-id': Flags.string({
      description: 'The ID of the Non-Custodial wallet',
      required: true,
    }),
    'derivation-path': Flags.string({
      description: 'An array of integers (passed as JSON stringified array) representing the full BIP44 derivation path of the requested public key. \nThe first element must always be 44.\n',
      required: true,
    }),
    'algorithm': Flags.string({
      description: 'Elliptic Curve',
      required: true,
      options: ['MPC_ECDSA_SECP256K1', 'MPC_ECDSA_SECP256R1', 'MPC_EDDSA_ED25519'],
    }),
    'compressed': Flags.boolean({
      description: 'Compressed/Uncompressed public key format',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/ncw/wallets/{walletId}/public_key_info'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPublicKeyInfoNcw)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['walletId'] = String(flags['wallet-id'])

    const queryParams: Record<string, string> = {}
    if (flags['derivation-path'] !== undefined && flags['derivation-path'] !== null) {
      queryParams['derivationPath'] = String(flags['derivation-path'])
    }
    if (flags['algorithm'] !== undefined && flags['algorithm'] !== null) {
      queryParams['algorithm'] = String(flags['algorithm'])
    }
    if (flags['compressed'] !== undefined && flags['compressed'] !== null) {
      queryParams['compressed'] = String(flags['compressed'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/ncw/wallets/{walletId}/public_key_info',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
