import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class AttachOrDetachTagsFromVaultAccounts extends FireblocksBaseCommand {
  static summary = 'Attach or detach tags from vault accounts'

  static description = 'Attach or detach one or more tags from the requested vault accounts.\nEndpoint Permission: For protected tags: Owner, Admin, Non-Signing Admin. For non protected tags: Owner, Admin, Non-Signing Admin, Signer, Editor, Approver.\n\nOperation ID: attachOrDetachTagsFromVaultAccounts\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Vaults/attachOrDetachTagsFromVaultAccounts'

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
  static path = '/v1/vault/accounts/attached_tags'
  static isBeta = false
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(AttachOrDetachTagsFromVaultAccounts)

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



    await this.confirmOrAbort('POST', '/v1/vault/accounts/attached_tags')

    const result = await this.makeRequest(
      'POST',
      '/v1/vault/accounts/attached_tags',
      {
        body,
        headers,
      },
    )

    return result
  }
}
