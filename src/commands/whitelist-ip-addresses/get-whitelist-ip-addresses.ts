import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetWhitelistIpAddresses extends FireblocksBaseCommand {
  static summary = 'Get whitelisted ip addresses for an API Key'

  static description = 'Get a list of the whitelisted IP addresses for a specific API Key\n- Please note that this endpoint is available only for API keys with Admin/Non Signing Admin permissions.\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getWhitelistIpAddresses\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/whitelist%20ip%20addresses/getWhitelistIpAddresses'

  static enableJsonFlag = false

  static flags = {
    'user-id': Flags.string({
      description: 'The ID of the api user',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/management/api_users/{userId}/whitelist_ip_addresses'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetWhitelistIpAddresses)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['userId'] = String(flags['user-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/management/api_users/{userId}/whitelist_ip_addresses',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
