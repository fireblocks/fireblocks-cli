import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateSecurityFindingById extends FireblocksBaseCommand {
  static summary = 'Update a FSPM security finding by ID'

  static description = 'Accepts or reopens a finding for the workspace. When accepting a finding\n(\`status: "ACCEPTED"\`), \`statusUpdatedReason\` is required.\nEndpoint Roles: Security Admin.\n\nOperation ID: updateSecurityFindingById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Security%20Posture%20Management/updateSecurityFindingById'

  static enableJsonFlag = false

  static flags = {
    'id': Flags.string({
      description: 'Unique identifier of the finding',
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
  static path = '/v1/security/fspm/findings/{id}'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateSecurityFindingById)

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
    pathParams['id'] = String(flags['id'])


    await this.confirmOrAbort('PATCH', '/v1/security/fspm/findings/{id}')

    const result = await this.makeRequest(
      'PATCH',
      '/v1/security/fspm/findings/{id}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
