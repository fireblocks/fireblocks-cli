import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApprovalById extends FireblocksBaseCommand {
  static summary = 'Get a single approval request'

  static description = 'Retrieve full detail for a single approval request by ID, including the payload to sign and, when requested, the request\'s \`quorumStatus\`.\n\nBecause this endpoint addresses one request, it accepts \`quorumStatusMode=FULL\`, which adds the participating approvers and their individual approval state.\n\n\`userStatus\` reflects the authenticated user by default. Pass \`userId\` to report it for another user instead.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin, Security Auditor.\n\nOperation ID: getApprovalById\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/getApprovalById'

  static enableJsonFlag = false

  static flags = {
    'request-id': Flags.string({
      description: 'The approval request ID.',
      required: true,
    }),
    'user-id': Flags.string({
      description: 'Report \`userStatus\` for this user instead of the authenticated user. This selects whose approval state is returned; it does not change which requests can be fetched. Requires an Admin, Non-Signing Admin, Security Admin or Security Auditor role; other roles are rejected with 403.',
    }),
    'quorum-status-mode': Flags.string({
      description: 'How much quorum detail to include in \`quorumStatus\`. \`NONE\` (the default) returns it as \`null\`. \`SUMMARY\` returns the approval thresholds, current counts and status. \`FULL\` adds \`users\` and the per-group \`members\` indexes identifying who may approve and who already has. Any other value is rejected with 400; the parameter is case-sensitive.',
      default: 'NONE',
      options: ['NONE', 'SUMMARY', 'FULL'],
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/approvals/{requestId}'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApprovalById)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}

    const pathParams: Record<string, string> = {}
    pathParams['requestId'] = String(flags['request-id'])

    const queryParams: Record<string, string> = {}
    if (flags['user-id'] !== undefined && flags['user-id'] !== null) {
      queryParams['userId'] = String(flags['user-id'])
    }
    if (flags['quorum-status-mode'] !== undefined && flags['quorum-status-mode'] !== null) {
      queryParams['quorumStatusMode'] = String(flags['quorum-status-mode'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/approvals/{requestId}',
      {
        headers,
        pathParams,
        queryParams,
      },
    )

    return result
  }
}
