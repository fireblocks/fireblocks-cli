import {Flags} from '@oclif/core'
import {FireblocksBaseCommand} from '../../lib/base-command.js'

export default class UploadOrderRequirementFile extends FireblocksBaseCommand {
  static summary = 'Upload a file for an order requirement'

  static description = 'Upload a single file (multipart/form-data) in response to an order requirement on an order that is in\n\`AWAITING_INFORMATION\` status. Call this endpoint once per required file.\n\nSend \`fileKey\` (matching a \`fileKey\` from \`requiredFiles\` on the GET response) and the binary \`file\`. Its type\nmust be one of the supported file formats. Fireblocks encrypts each file and uploads it individually to the\nunderlying provider. The textual response is submitted separately via\n\`POST /trading/orders/{orderId}/requirement/data\`.\n\nNote: These endpoints are currently in beta and might be subject to changes.\n\nIf you want to participate and learn more about the Fireblocks Trading, please contact your Fireblocks Customer Success Manager or send an email to CSM@fireblocks.com.\n\nEndpoint Permission: Owner, Admin, Non-Signing Admin, Signer, Editor.\n\nFor detailed information about error codes and troubleshooting, please refer to our [API Error Codes documentation](https://developers.fireblocks.com/reference/api-error-codes).\n\nOperation ID: uploadOrderRequirementFile\nDocs: https://docs.fireblocks.com/api/swagger-ui/#/Trading/uploadOrderRequirementFile'

  static enableJsonFlag = false

  static flags = {
    'order-id': Flags.string({
      description: 'The ID of the order to upload the order requirement file for.',
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

  static method = 'POST'
  static path = '/v1/trading/orders/{orderId}/requirement/file'
  static isBeta = true
  static responseHeaders: string[] = ["X-Request-ID"]

  async run(): Promise<unknown> {
    const {flags} = await this.parse(UploadOrderRequirementFile)

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
    pathParams['orderId'] = String(flags['order-id'])


    await this.confirmOrAbort('POST', '/v1/trading/orders/{orderId}/requirement/file')

    const result = await this.makeRequest(
      'POST',
      '/v1/trading/orders/{orderId}/requirement/file',
      {
        body,
        headers,
        pathParams,
      },
    )

    return result
  }
}
