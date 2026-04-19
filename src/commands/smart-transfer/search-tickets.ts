import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SearchTickets extends FireblocksBaseCommand {
  static summary = 'Find Ticket'

  static description = 'Find tickets by their title or ticker. You can also query all tickets without filters by not providing any input parameters.\n**Endpoint Permissions:** Admin, Non-Signing Admin, Signer, Approver, Editor, Viewer.\n\nOperation ID: searchTickets\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/searchTickets'

  static enableJsonFlag = false

  static flags = {
    'q': Flags.string({
      description: 'Search string - counterparty name or asset or ticketId. Optional',
    }),
    'statuses': Flags.string({
      description: 'Ticket statuses for Smart Transfer tickets. Optional',
      default: '',
    }),
    'network-id': Flags.string({
      description: 'NetworkId that is used in the ticket	. Optional',
    }),
    'created-by-me': Flags.boolean({
      description: 'Filter created tickets by created by self or by others. Optional',
    }),
    'expires-after': Flags.string({
      description: 'Lower bound of search range. Optional',
    }),
    'expires-before': Flags.string({
      description: 'Upper bound of search range. Optional',
    }),
    'type': Flags.string({
      description: 'Type of transfer. ASYNC executes transfers as they are funded, DVP executes all terms (legs) as one dvp transfer',
      options: ['ASYNC', 'DVP'],
    }),
    'external-ref-id': Flags.string({
      description: 'External ref. ID that workspace can use to identify ticket outside of Fireblocks system.',
    }),
    'after': Flags.string({
      description: 'ID of the record after which to fetch $limit records',
    }),
    'limit': Flags.string({
      description: 'Number of records to fetch. By default, it is 100',
    }),
    'sort-by': Flags.string({
      description: 'Sort by field',
      default: 'createdAt',
      options: ['createdAt', 'updatedAt', 'submittedAt'],
    }),
    'order': Flags.string({
      description: 'ASC / DESC ordering (default DESC)',
      default: 'DESC',
      options: ['ASC', 'DESC'],
    }),
  }

  static method = 'GET'
  static path = '/v1/smart-transfers'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SearchTickets)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['q'] !== undefined && flags['q'] !== null) {
      queryParams['q'] = String(flags['q'])
    }
    if (flags['statuses'] !== undefined && flags['statuses'] !== null) {
      queryParams['statuses'] = String(flags['statuses'])
    }
    if (flags['network-id'] !== undefined && flags['network-id'] !== null) {
      queryParams['networkId'] = String(flags['network-id'])
    }
    if (flags['created-by-me'] !== undefined && flags['created-by-me'] !== null) {
      queryParams['createdByMe'] = String(flags['created-by-me'])
    }
    if (flags['expires-after'] !== undefined && flags['expires-after'] !== null) {
      queryParams['expiresAfter'] = String(flags['expires-after'])
    }
    if (flags['expires-before'] !== undefined && flags['expires-before'] !== null) {
      queryParams['expiresBefore'] = String(flags['expires-before'])
    }
    if (flags['type'] !== undefined && flags['type'] !== null) {
      queryParams['type'] = String(flags['type'])
    }
    if (flags['external-ref-id'] !== undefined && flags['external-ref-id'] !== null) {
      queryParams['externalRefId'] = String(flags['external-ref-id'])
    }
    if (flags['after'] !== undefined && flags['after'] !== null) {
      queryParams['after'] = String(flags['after'])
    }
    if (flags['limit'] !== undefined && flags['limit'] !== null) {
      queryParams['limit'] = String(flags['limit'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/smart-transfers',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
