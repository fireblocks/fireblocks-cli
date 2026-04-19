import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetTags extends FireblocksBaseCommand {
  static summary = 'Get list of tags'

  static description = 'Retrieve a paged list of all tags according to filters.\n\nOperation ID: getTags\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/getTags'

  static enableJsonFlag = false

  static flags = {
    'page-cursor': Flags.string({
      description: 'Page cursor to get the next page.',
    }),
    'page-size': Flags.string({
      description: 'Maximum number of items in the page',
      default: '100',
    }),
    'label': Flags.string({
      description: 'Label prefix to filter by.',
    }),
    'tag-ids': Flags.string({
      description: 'List of tag IDs to filter by.',
    }),
    'include-pending-approvals-info': Flags.boolean({
      description: 'Whether to include pending approval requests info.',
      default: false,
    }),
    'is-protected': Flags.boolean({
      description: 'The isProtected parameter',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tags'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetTags)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['label'] !== undefined && flags['label'] !== null) {
      queryParams['label'] = String(flags['label'])
    }
    if (flags['tag-ids'] !== undefined && flags['tag-ids'] !== null) {
      queryParams['tagIds'] = String(flags['tag-ids'])
    }
    if (flags['include-pending-approvals-info'] !== undefined && flags['include-pending-approvals-info'] !== null) {
      queryParams['includePendingApprovalsInfo'] = String(flags['include-pending-approvals-info'])
    }
    if (flags['is-protected'] !== undefined && flags['is-protected'] !== null) {
      queryParams['isProtected'] = String(flags['is-protected'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/tags',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
