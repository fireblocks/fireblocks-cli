import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class PublishDraft extends FireblocksBaseCommand {
  static summary = 'Send publish request for a certain draft id'

  static description = 'Send publish request of certain draft id and returns the response.\n\n**⚠️ IMPORTANT SECURITY NOTICE:**\n\nThe Fireblocks Policy is a critical security guardrail. Programmatically modifying your policy via the API introduces significant security risks. As an industry best practice, Fireblocks strongly recommends manual editing accompanied by strict human oversight and approval workflows for all policy changes. Programmatic updates should only be implemented by advanced users with comprehensive, multi-layer security controls in place.\n\nIf you want to learn more about the Fireblocks Policy Editor, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nOperation ID: publishDraft\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor%20V2/publishDraft'

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
  static path = '/v1/policy/draft'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(PublishDraft)

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



    await this.confirmOrAbort('POST', '/v1/policy/draft')

    const result = await this.makeRequest(
      'POST',
      '/v1/policy/draft',
      {
        body,
        headers,
      },
    )

    return result
  }
}
