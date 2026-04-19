import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateTag extends FireblocksBaseCommand {
  static summary = 'Update a tag'

  static description = 'Update an existing specified tag.\nEndpoint Permission: For protected tags: Owner, Admin, Non-Signing Admin. For non protected tags: Owner, Admin, Non-Signing Admin, Signer, Editor, Approver.\n\nOperation ID: updateTag\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/updateTag'

  static enableJsonFlag = false

  static flags = {
    'tag-id': Flags.string({
      description: 'The ID of the tag to update',
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
  static path = '/v1/tags/{tagId}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateTag)

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

    const pathParams: Record<string, string> = {}
    pathParams['tagId'] = String(flags['tag-id'])


    await this.confirmOrAbort('PATCH', '/v1/tags/{tagId}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/tags/{tagId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
