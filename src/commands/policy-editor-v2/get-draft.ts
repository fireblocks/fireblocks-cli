import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDraft extends FireblocksBaseCommand {
  static summary = 'Get the active draft by policy type'

  static description = 'Returns the active draft and its validation for a specific policy type. \n**Note:** These endpoints are currently in beta and might be subject to changes.\n\nOperation ID: getDraft\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/getDraft'

  static enableJsonFlag = false

  static flags = {
    'policy-type': Flags.string({
      description: 'The policy type(s) to retrieve. Can be a single type or multiple types by repeating the parameter (e.g., ?policyType=TRANSFER&policyType=MINT).',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/policy/draft'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDraft)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['policy-type'] !== undefined && flags['policy-type'] !== null) {
      queryParams['policyType'] = String(flags['policy-type'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/policy/draft',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
