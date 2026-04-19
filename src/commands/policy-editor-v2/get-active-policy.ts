import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetActivePolicy extends FireblocksBaseCommand {
  static summary = 'Get the active policy and its validation by policy type'

  static description = 'Returns the active policy and its validation for a specific policy type.\n\n**Note:** This endpoint is currently in beta and subject to change. If you want to participate in the Policies beta, contact your Fireblocks Customer Success Manager or send an email to csm@fireblocks.com.\n\nEndpoint Permissions: Owner, Admin, Non-Signing Admin.\n\nOperation ID: getActivePolicy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/getActivePolicy'

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
  static path = '/v1/policy/active_policy'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetActivePolicy)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['policy-type'] !== undefined && flags['policy-type'] !== null) {
      queryParams['policyType'] = String(flags['policy-type'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/policy/active_policy',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
