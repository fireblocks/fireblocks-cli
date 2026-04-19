import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class SetUserGroups extends FireblocksBaseCommand {
  static summary = 'Set user group'

  static description = 'Set Smart Transfers user group to receive email notifications for Smart Transfers.\nEndpoint Permission: Admin, Non-Signing Admin, Signer, Approver, Editor.\n\nOperation ID: setUserGroups\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Smart%20Transfer/setUserGroups'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/smart-transfers/settings/user-groups'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(SetUserGroups)

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



    await this.confirmOrAbort('POST', '/v1/smart-transfers/settings/user-groups')

    const result = await this.makeRequest(
      'POST',
      '/v1/smart-transfers/settings/user-groups',
      {
        body,
        headers,
      },
    )

    return result
  }
}
