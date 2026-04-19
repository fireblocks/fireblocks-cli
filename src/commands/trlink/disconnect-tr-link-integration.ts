import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class DisconnectTRLinkIntegration extends FireblocksBaseCommand {
  static summary = 'Disconnect customer integration'

  static description = 'Disconnects the integration for the authenticated workspace (tenant): removes stored credentials and deletes this tenant\'s integration record. The operation is scoped to the caller\'s tenant; it does not remove partner-side state for other workspaces that reuse the same logical customer integration. The record cannot be recovered after delete.\n\nOperation ID: disconnectTRLinkIntegration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/TRLink/disconnectTRLinkIntegration'

  static enableJsonFlag = false

  static flags = {
    'customer-integration-id': Flags.string({
      description: 'Customer integration unique identifier',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'DELETE'
  static path = '/v1/screening/trlink/customers/integration/{customerIntegrationId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(DisconnectTRLinkIntegration)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['customerIntegrationId'] = String(flags['customer-integration-id'])


    await this.confirmOrAbort('DELETE', '/v1/screening/trlink/customers/integration/{customerIntegrationId}')

    const result = await this.makeRequest(
      'DELETE',
      '/v1/screening/trlink/customers/integration/{customerIntegrationId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
