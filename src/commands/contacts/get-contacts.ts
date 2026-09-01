import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetContacts extends FireblocksBaseCommand {
  static summary = 'List contacts'

  static description = 'Returns a paginated list of the workspace\'s address book contacts.\n\nLive contacts are returned by default; pass \`archived=true\` to return only the archived\nones. Results are sorted by \`name\` ascending unless \`sortBy\`/\`order\` say otherwise.\nBecause the sort column is the page cursor\'s leading key, a \`pageCursor\` must be replayed\nwith the same sort it was minted under, or the request is rejected.\n\nEndpoint Permissions: any workspace role may read the address book. Writes are role-gated.\n\nOperation ID: getContacts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Contacts/getContacts'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Cursor indicating the page position. Omit to fetch the first page.',
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page',
      default: 100,
    }),
    'include-total': Flags.boolean({
      description: 'Return the total count of matching contacts alongside the page. Counting is opt-in because it costs an extra pass over the filtered set; \`total\` is omitted from the response unless this is \`true\`.',
      default: false,
    }),
    'name': Flags.string({
      description: 'Filter by a case-insensitive substring of the contact name',
    }),
    'types': Flags.string({
      description: 'Filter by one or more contact types',
    }),
    'container-id': Flags.string({
      description: 'Filter by the container holding the contact',
    }),
    'archived': Flags.boolean({
      description: 'Return only archived contacts instead of live ones',
      default: false,
    }),
    'access-control': Flags.string({
      description: 'Filter by the access control applied to the contact',
      options: ['WHITELIST', 'BLACKLIST'],
    }),
    'include-tag-ids': Flags.string({
      description: 'List of tag IDs to include. Contacts with any of these tags will be included',
    }),
    'exclude-tag-ids': Flags.string({
      description: 'List of tag IDs to exclude. Contacts with any of these tags will be filtered out',
    }),
    'sort-by': Flags.string({
      description: 'The field to sort by',
      default: 'name',
      options: ['name', 'updatedAt'],
    }),
    'order': Flags.string({
      description: 'The sort direction',
      default: 'ASC',
      options: ['ASC', 'DESC'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/contacts'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetContacts)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['include-total'] !== undefined && flags['include-total'] !== null) {
      queryParams['includeTotal'] = String(flags['include-total'])
    }
    if (flags['name'] !== undefined && flags['name'] !== null) {
      queryParams['name'] = String(flags['name'])
    }
    if (flags['types'] !== undefined && flags['types'] !== null) {
      queryParams['types'] = String(flags['types'])
    }
    if (flags['container-id'] !== undefined && flags['container-id'] !== null) {
      queryParams['containerId'] = String(flags['container-id'])
    }
    if (flags['archived'] !== undefined && flags['archived'] !== null) {
      queryParams['archived'] = String(flags['archived'])
    }
    if (flags['access-control'] !== undefined && flags['access-control'] !== null) {
      queryParams['accessControl'] = String(flags['access-control'])
    }
    if (flags['include-tag-ids'] !== undefined && flags['include-tag-ids'] !== null) {
      queryParams['includeTagIds'] = String(flags['include-tag-ids'])
    }
    if (flags['exclude-tag-ids'] !== undefined && flags['exclude-tag-ids'] !== null) {
      queryParams['excludeTagIds'] = String(flags['exclude-tag-ids'])
    }
    if (flags['sort-by'] !== undefined && flags['sort-by'] !== null) {
      queryParams['sortBy'] = String(flags['sort-by'])
    }
    if (flags['order'] !== undefined && flags['order'] !== null) {
      queryParams['order'] = String(flags['order'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/contacts',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
