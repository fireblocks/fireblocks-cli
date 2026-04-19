import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class CreatePayout extends FireblocksBaseCommand {
  static summary = 'Create a payout instruction set'

  static description = '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. \nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. \n Create a payout instruction set. \nA payout instruction set is a set of instructions for distributing payments from a single payment account to a list of payee accounts. \nThe instruction set defines: \n\nthe payment account and its account type (vault, exchange, or fiat). \nthe account type (vault account, exchange account, whitelisted address, network connection, fiat account, or merchant account), the amount, and the asset of payment for each payee account.\n\nLearn more about Fireblocks Payments - Payouts in the following [guide](https://developers.fireblocks.com/docs/create-payouts).\nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: createPayout\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Payout/createPayout'

  static enableJsonFlag = false

  static flags = {
    data: Flags.string({
      description: 'JSON request body',
    }),
  }

  static method = 'POST'
  static path = '/v1/payments/payout'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(CreatePayout)

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



    await this.confirmOrAbort('POST', '/v1/payments/payout')

    const result = await this.makeRequest(
      'POST',
      '/v1/payments/payout',
      {
        body,
        headers,
      },
    )

    return result
  }
}
