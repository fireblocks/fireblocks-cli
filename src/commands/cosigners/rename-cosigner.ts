import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class RenameCosigner extends FireblocksBaseCommand {
  static summary = 'Rename cosigner'

  static description = 'Rename a cosigner by ID.\n**Note:** These endpoints are currently in beta and might be subject to changes.\nEndpoint Permission: Admin and Non-Signing Admin.\n\nOperation ID: renameCosigner\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Cosigners/renameCosigner'

  static enableJsonFlag = false

  static flags = {
    'cosigner-id': Flags.string({
      description: 'The unique identifier of the cosigner',
      required: true,
    }),
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'PATCH'
  static path = '/v1/cosigners/{cosignerId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(RenameCosigner)

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

    const pathParams: Record<string, string> = {}
    pathParams['cosignerId'] = String(flags['cosigner-id'])


    await this.confirmOrAbort('PATCH', '/v1/cosigners/{cosignerId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/cosigners/{cosignerId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
