import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateDraftLegacy extends FireblocksBaseCommand {
  static summary = 'Update the draft with a new set of rules'

  static description = 'Legacy Endpoint – Update the draft and return its validation. \n**Note:** \n- This endpoint will remain available for the foreseeable future and is not deprecated. - The \`updateDraft\` endpoint under policy/paths provides policy type-specific operations and improved functionality. - These endpoints are currently in beta and might be subject to changes.\nIf you want to participate and learn more about the Fireblocks TAP, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nOperation ID: updateDraftLegacy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor/updateDraftLegacy'

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

  static method = 'PUT'
  static path = '/v1/tap/draft'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateDraftLegacy)

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



    await this.confirmOrAbort('PUT', '/v1/tap/draft')

    const result = await this.makeRequest(
      'PUT',
      '/v1/tap/draft',
      {
        body,
        headers,
      },
    )

    return result
  }
}
