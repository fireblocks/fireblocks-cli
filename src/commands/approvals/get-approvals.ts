import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class GetApprovals extends FireblocksBaseCommand {
  static summary = 'List approval requests'

  static description = 'Retrieve the pending approval requests the authenticated API user is eligible to act on, including requests the user has already approved that are still pending overall.\n\nThe response is scoped to the authenticated user by default. Pass \`userId\` to read another user\'s queue, or \`includeAllUsers=true\` to read every pending request in the workspace. Both require an Admin, Non-Signing Admin, Security Admin or Security Auditor role and are rejected with 403 otherwise.\n\nSet \`quorumStatusMode=SUMMARY\` to include each request\'s approval thresholds and counts. The per-approver breakdown is available only when fetching a single request — see \`GET /approvals/{requestId}\`.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Approver, Signer, Security Admin, Security Auditor.\n\nOperation ID: getApprovals\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Approvals/getApprovals'

  static enableJsonFlag = false

  static flags = {
    'include-user-approved': Flags.boolean({
      description: 'When true, also include requests the authenticated user has already approved that are still pending overall. Defaults to false (only requests the user has not yet acted on).',
    }),
    'user-id': Flags.string({
      description: 'Return the pending requests for this user instead of the authenticated user. Requires an Admin, Non-Signing Admin, Security Admin or Security Auditor role; other roles are rejected with 403. Cannot be combined with \`includeAllUsers=true\` — sending both is rejected with 400.',
    }),
    'include-all-users': Flags.boolean({
      description: 'When true, return every pending request in the workspace instead of a single user\'s queue. Defaults to false. Requires an Admin, Non-Signing Admin, Security Admin or Security Auditor role; other roles are rejected with 403. In this mode \`userStatus\` is always \`USER_STATUS_NOT_APPLICABLE\`, because the response is not scoped to one user, and \`includeUserApproved\` has no effect. Cannot be combined with \`userId\`.',
      default: false,
    }),
    'quorum-status-mode': Flags.string({
      description: 'How much quorum detail to include in each request\'s \`quorumStatus\`. \`NONE\` (the default) returns it as \`null\`. \`SUMMARY\` returns the approval thresholds, current counts and status. \`FULL\` is rejected with 400 on this endpoint because the per-approver breakdown requires a single request — use \`GET /approvals/{requestId}\` for it. Any other value is rejected with 400; the parameter is case-sensitive.',
      default: 'NONE',
      options: ['NONE', 'SUMMARY'],
    }),
    'page-size': Flags.integer({
      description: 'Number of results per page. Maximum 30. Defaults to 20.',
      default: 20,
    }),
    'page-cursor': Flags.string({
      description: 'Cursor returned from the previous response (the \`next\` field) to fetch the next page.',
    }),
    'include-headers': Flags.boolean({
      description: 'Include spec-defined response headers in output',
      default: false,
    }),
  }

  static method = 'GET'
  static path = '/v1/approvals'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(GetApprovals)

    this.logToStderr('Warning: This command is in beta and may change in future releases.')


    const headers: Record<string, string> = {}


    const queryParams: Record<string, string> = {}
    if (flags['include-user-approved'] !== undefined && flags['include-user-approved'] !== null) {
      queryParams['includeUserApproved'] = String(flags['include-user-approved'])
    }
    if (flags['user-id'] !== undefined && flags['user-id'] !== null) {
      queryParams['userId'] = String(flags['user-id'])
    }
    if (flags['include-all-users'] !== undefined && flags['include-all-users'] !== null) {
      queryParams['includeAllUsers'] = String(flags['include-all-users'])
    }
    if (flags['quorum-status-mode'] !== undefined && flags['quorum-status-mode'] !== null) {
      queryParams['quorumStatusMode'] = String(flags['quorum-status-mode'])
    }
    if (flags['page-size'] !== undefined && flags['page-size'] !== null) {
      queryParams['pageSize'] = String(flags['page-size'])
    }
    if (flags['page-cursor'] !== undefined && flags['page-cursor'] !== null) {
      queryParams['pageCursor'] = String(flags['page-cursor'])
    }

    const result = await this.makeRequest(
      'GET',
      '/v1/approvals',
      {
        headers,
        queryParams,
      },
    )

    return result
  }
}
