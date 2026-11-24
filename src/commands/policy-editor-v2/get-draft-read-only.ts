import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDraftReadOnly extends FireblocksBaseCommand {
  static summary = 'Get the current draft without starting an edit session'

  static description = 'Returns the active draft and its validation for a specific policy type, without taking the edit lock. If no draft exists, the active policy is returned with a null draftId.\n\nOperation ID: getDraftReadOnly\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/getDraftReadOnly'

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
  static path = '/v1/policy/draft/read_only'
  static operationId = 'getDraftReadOnly'
  static isEa = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDraftReadOnly)


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['policy-type'] !== undefined && flags['policy-type'] !== null) {
      queryParams['policyType'] = String(flags['policy-type'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/policy/draft/read_only',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
