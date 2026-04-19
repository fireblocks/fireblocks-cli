import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPublicKeyInfo extends FireblocksBaseCommand {
  static summary = 'Get the public key for a derivation path'

  static description = 'Gets the public key information based on derivation path and signing algorithm.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getPublicKeyInfo\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/getPublicKeyInfo'

  static enableJsonFlag = false

  static flags = {
    'derivation-path': Flags.string({
      description: 'The derivationPath parameter',
      required: true,
    }),
    'algorithm': Flags.string({
      description: 'The algorithm parameter',
      required: true,
    }),
    'compressed': Flags.boolean({
      description: 'The compressed parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/vault/public_key_info'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPublicKeyInfo)


    const headers: Record<string, string> = {}


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
      '/v1/vault/public_key_info',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
