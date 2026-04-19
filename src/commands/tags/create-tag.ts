import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateTag extends FireblocksBaseCommand {
  static summary = 'Create a new tag'

  static description = 'Create a new tag.\nEndpoint Permissions: For protected tags: ADMIN,NON_SIGNING_ADMIN,OWNER. For non protected tags: ADMIN,NON_SIGNING_ADMIN,OWNER,SIGNER,EDITOR,APPROVER.\n\nOperation ID: createTag\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Tags/createTag'

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
  static path = '/v1/tags'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateTag)

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



    await this.confirmOrAbort('POST', '/v1/tags')

    const result = await this.makeRequest(
      'POST',
      '/v1/tags',
      {
        body,
        headers,
      },
    )

    return result
  }
}
