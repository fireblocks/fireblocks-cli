import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetPayout extends FireblocksBaseCommand {
  static summary = 'Get the status of a payout instruction set'

  static description = '**Note:** The reference content in this section documents the Payments Engine endpoint. The Payments Engine endpoints include APIs available only for customers with Payments Engine enabled on their accounts. \nThese endpoints are currently in beta and might be subject to changes.\nIf you want to learn more about Fireblocks Payments Engine, please contact your Fireblocks Customer Success Manager or email CSM@fireblocks.com. \nEndpoint Permission: Admin, Non-Signing Admin.\n\nOperation ID: getPayout\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Payments%20-%20Payout/getPayout'

  static enableJsonFlag = false

  static flags = {
    'payout-id': Flags.string({
      description: 'the payout id received from the creation of the payout instruction set',
      required: true,
    }),
  }

  static method = 'GET'
  static path = '/v1/payments/payout/{payoutId}'
  static isBeta = false

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetPayout)


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['payoutId'] = String(flags['payout-id'])


    const result = await this.makeRequest(
      'GET',
      '/v1/payments/payout/{payoutId}',
      {
        headers,
        pathParams,
      },
    )

    return result
  }
}
