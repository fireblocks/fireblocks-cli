import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetDraftLegacy extends FireblocksBaseCommand {
  static summary = 'Get the active draft'

  static description = 'Legacy Endpoint – Returns the active draft and its validation. \n**Note:** \n- This endpoint will remain available for the foreseeable future and is not deprecated. - The \`getDraft\` endpoint under policy/paths provides policy type-specific operations and improved functionality. - These endpoints are currently in beta and might be subject to changes.\nIf you want to participate and learn more about the Fireblocks TAP, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nOperation ID: getDraftLegacy\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Policy%20Editor/getDraftLegacy'

  static enableJsonFlag = false

  static flags = {
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/tap/draft'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetDraftLegacy)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}



    const result = await this.makeRequest(
      'GET',
      '/v1/tap/draft',
      {
        headers,
      },
    )

    return result
  }
}
