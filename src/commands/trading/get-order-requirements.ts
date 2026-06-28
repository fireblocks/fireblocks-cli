import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOrderRequirements extends FireblocksBaseCommand {
  static summary = 'Get order requirement details for an order'

  static description = 'Fetch order requirement details for an order that is in \`AWAITING_INFORMATION\` status.\n\nThe response includes \`requirementId\` and \`dueBy\` metadata, a\n\`requiredData\` JSON Schema (Draft-7) describing the shape of the \`data\` object expected on\n\`POST /trading/orders/{orderId}/requirement/data\`, and \`requiredFiles\` descriptors for any files the\nprovider requires (uploaded via \`POST /trading/orders/{orderId}/requirement/file\`).\n\nNote: These endpoints are currently in beta and might be subject to changes.\n\nIf you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getOrderRequirements\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getOrderRequirements'

  static enableJsonFlag = false

  static flags = {
    'order-id': Flags.string({
      description: 'The ID of the order for which the order requirement is issued.',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/trading/orders/{orderId}/requirement'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOrderRequirements)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['orderId'] = String(flags['order-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/trading/orders/{orderId}/requirement',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
