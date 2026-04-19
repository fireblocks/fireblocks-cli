import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UpdateUserGroup extends FireblocksBaseCommand {
  static summary = 'Update user group'

  static description = 'Update a user group by ID.\n\n**Note**:\n- This endpoint is now in Beta, disabled for general availability at this time.\n- Please note that this endpoint is available only for API keys with Admin permissions.\n\nOperation ID: updateUserGroup\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/User%20groups/updateUserGroup'

  static enableJsonFlag = false

  static flags = {
    'group-id': Flags.string({
      description: 'The ID of the user group',
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

  static method = 'PUT'
  static path = '/v1/management/user_groups/{groupId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UpdateUserGroup)

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

    const pathParams: Record<string, string> = {}
    pathParams['groupId'] = String(flags['group-id'])


    await this.confirmOrAbort('PUT', '/v1/management/user_groups/{groupId}')

    const result = await this.makeRequest(
      'PUT',
      '/v1/management/user_groups/{groupId}',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
