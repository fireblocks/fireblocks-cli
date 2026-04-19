import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreateFlowConfiguration extends FireblocksBaseCommand {
  static summary = 'Create payment flow configuration'

  static description = 'Generate a new configuration ID to be used for initiating executions in subsequent phases. This configuration should include the operations you intend to incorporate into the workflow, such as TRANSFER, CONVERT, and DISBURSE, in addition to your pre-screening preferences, which are disabled by default.\n\nOperation ID: createFlowConfiguration\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Flows/createFlowConfiguration'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
  }

  static method = 'POST'
  static path = '/v1/payments/workflow_config'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreateFlowConfiguration)

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



    await this.confirmOrAbort('POST', '/v1/payments/workflow_config')

    const result = await this.makeRequest(
      'POST',
      '/v1/payments/workflow_config',
      {
        body,
        headers,
      },
    )

    return result
  }
}
