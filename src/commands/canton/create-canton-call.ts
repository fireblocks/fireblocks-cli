import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateCantonCall extends FireblocksBaseCommand {
  static summary = 'Make a Canton call'

  static description = 'Submits one Canton call. \`type\` names the call and selects the shape of \`payload\`.\nAn unknown or missing \`type\`, or a \`payload\` missing a required field, is a \`400\`. A field that does not belong to the selected \`type\` is ignored rather than rejected.\nFour types are specified but not available in v1 and return \`501\`: \`DTCC_END_INVESTOR_INVITE_CANCEL\`, \`DTCC_END_INVESTOR_OFFBOARD\`, \`DTCC_ALLOW_LIST_ADD\`, \`DTCC_ALLOW_LIST_REMOVE\`. \`TRANSFER_WITHDRAW\` has no owning service at all.\n\nOperation ID: createCantonCall\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Canton/createCantonCall'

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
  static path = '/v1/operations/canton/calls'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateCantonCall)

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



    await this.confirmOrAbort('POST', '/v1/operations/canton/calls')

    const result = await this.makeRequest(
      'POST',
      '/v1/operations/canton/calls',
      {
        body,
        headers,
      },
    )

    return result
  }
}
