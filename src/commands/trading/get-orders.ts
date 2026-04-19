import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetOrders extends FireblocksBaseCommand {
  static summary = 'Get orders'

  static description = 'Retrieve a paginated list of orders with optional filtering by account, provider, status, and time range.\n\nNote:These endpoints are currently in beta and might be subject to changes.\n\nIf you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: getOrders\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/getOrders'

  static enableJsonFlag = false

  static flags = {
    'page-size': Flags.integer({
      description: 'pageSize for pagination.',
      required: true,
    }),
    'page-cursor': Flags.string({
      description: 'The pageCursor parameter',
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
    'account-id': Flags.string({
      description: 'Filter by accountId.',
    }),
    'provider-id': Flags.string({
      description: 'Filter by providerId.',
    }),
    'statuses': Flags.string({
      description: 'Filter by order status.',
    }),
    'start-time': Flags.integer({
      description: 'The startTime parameter',
    }),
    'end-time': Flags.integer({
      description: 'The endTime parameter',
    }),
    'asset-conversion-type': Flags.string({
      description: 'The assetConversionType parameter',
      options: ['DIGITAL_ONLY', 'FIAT'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/trading/orders'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetOrders)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }
    if (flags['account-id'] !== undefined && flags['account-id'] !== null) {
      queryParams['accountId'] = String(flags['account-id'])
    }
    if (flags['provider-id'] !== undefined && flags['provider-id'] !== null) {
      queryParams['providerId'] = String(flags['provider-id'])
    }
    if (flags['statuses'] !== undefined && flags['statuses'] !== null) {
      queryParams['statuses'] = String(flags['statuses'])
    }
    if (flags['start-time'] !== undefined && flags['start-time'] !== null) {
      queryParams['startTime'] = String(flags['start-time'])
    }
    if (flags['end-time'] !== undefined && flags['end-time'] !== null) {
      queryParams['endTime'] = String(flags['end-time'])
    }
    if (flags['asset-conversion-type'] !== undefined && flags['asset-conversion-type'] !== null) {
      queryParams['assetConversionType'] = String(flags['asset-conversion-type'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/trading/orders',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
