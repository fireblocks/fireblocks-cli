import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class ExecutePayoutAction extends FireblocksBaseCommand {
  static summary = 'Execute a payout instruction set'

  static description = '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. \nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. \nExecute a payout instruction set.  \nThe instruction set will be verified and executed.\nSource locking \nIf you are executing a payout instruction set from a payment account with an already active payout the active payout will complete before the new payout instruction set can be executed. \nYou cannot execute the same payout instruction set more than once.\n\nOperation ID: executePayoutAction\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Payout/executePayoutAction'

  static enableJsonFlag = false

  static flags = {
    'payout-id': Flags.string({
      description: 'the payout id received from the creation of the payout instruction set',
      required: true,
    }),
  }

  static method = 'POST'
  static path = '/v1/payments/payout/{payoutId}/actions/execute'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(ExecutePayoutAction)


    const headers: Record<string, string> = {}
    if (flags['idempotency-key']) {
      headers['Idempotency-Key'] = flags['idempotency-key']
    }

    const pathParams: Record<string, string> = {}
    pathParams['payoutId'] = String(flags['payout-id'])


    await this.confirmOrAbort('POST', '/v1/payments/payout/{payoutId}/actions/execute')

    const result = await this.makeRequest(
      'POST',
      '/v1/payments/payout/{payoutId}/actions/execute',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
