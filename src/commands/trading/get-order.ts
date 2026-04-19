import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOrder extends FireblocksBaseCommand {
  static summary = 'Get order details'

  static description = 'Retrieve detailed information about a specific order by its ID.\n\nNote:These endpoints are currently in beta and might be subject to changes.\n\nIf you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getOrder\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getOrder'

  static enableJsonFlag = false

  static flags = {
    'order-id': Flags.string({
      description: 'The ID of the order to fetch.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/trading/orders/{orderId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOrder)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['orderId'] = String(flags['order-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/trading/orders/{orderId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
