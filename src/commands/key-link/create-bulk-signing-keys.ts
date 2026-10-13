import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateBulkSigningKeys extends FireblocksBaseCommand {
  static summary = 'Register signing keys in bulk'

  static description = 'Accepts a set of signing keys certified by a single validation key and queues them for registration in the background. Returns a job id to poll. A workspace can have one bulk registration at a time; submitting another while one is QUEUED or IN_PROGRESS is rejected with 409. Bulk registrations from different workspaces share a limited number of slots, so a job may wait QUEUED behind another workspace\'s before it starts. Keys already registered in the workspace are recognized and skipped, so resubmitting the same request after a failure is safe and only processes what is missing. Every key must carry its own proof of ownership; a bulk registration has no interactive step in which one can arrive later.\n\nOperation ID: createBulkSigningKeys\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Key%20Link/createBulkSigningKeys'

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
  static path = '/v1/key_link/signing_keys/bulk'
  static operationId = 'createBulkSigningKeys'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateBulkSigningKeys)

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



    await this.confirmOrAbort('POST', '/v1/key_link/signing_keys/bulk')

    const result = await this.makeRequest(
      'POST',
      '/v1/key_link/signing_keys/bulk',
      {
        body,
        headers,
      },
    )

    return result
  }
}
