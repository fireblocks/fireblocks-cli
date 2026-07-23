import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPolicyRuleQuota extends FireblocksBaseCommand {
  static summary = 'Calculate the AOT quota for a policy rule'

  static description = 'Returns the Amount Over Time (AOT) quota calculated for a specific policy rule.\n\nEndpoint Permissions: Owner, Admin, Non-Signing Admin.\n\nOperation ID: getPolicyRuleQuota\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/getPolicyRuleQuota'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'POST'
  static path = '/v1/policy/rules/quota'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPolicyRuleQuota)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')

    let body: Record<string, unknown> | undefined
    if (flags.data) {
      try {
        const parsed = JSON.parse(flags.data)
        if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
          this.error('--data must be a JSON object (e.g., \'{"key": "value"}\')')
        }
        body = parsed as Record<string, unknown>
      } catch {
        this.error('Invalid JSON in --data flag. Ensure the value is valid JSON.')
      }
    }

    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }



    await this.confirmOrAbort('POST', '/v1/policy/rules/quota')

    const result = await this.makeRequest(
      'POST',
      '/v1/policy/rules/quota',
      {
        body,
        headers,
      },
    )

    return result
  }
}
