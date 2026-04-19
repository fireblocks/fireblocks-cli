import {Command, Flags, Interfaces} from '@oclif/core'
import {createInterface} from 'node:readline'
import {resolveAuth} from './auth/index.js'
import type {AuthContext} from './auth/index.js'
import {fireblocksFetch, type RequestOptions, type ApiResponse} from './http/client.js'
import {mapHttpError, EXIT_CODE} from './errors/mapper.js'
import {formatOutput} from './output/formatter.js'
import {formatHeaders} from './output/headers.js'

export type BaseFlags = Interfaces.InferredFlags<typeof FireblocksBaseCommand.baseFlags>

export abstract class FireblocksBaseCommand extends Command {
  static baseFlags = {
    'api-key': Flags.string({
      description: 'Fireblocks API key',
      env: 'FIREBLOCKS_API_KEY',
    }),
    'secret-key': Flags.string({
      description: 'RSA private key (inline PEM or file path)',
    }),
    'base-url': Flags.string({
      description: 'API base URL override',
      env: 'FIREBLOCKS_BASE_URL',
    }),
    profile: Flags.string({
      description: 'Named credential profile',
    }),
    output: Flags.string({
      char: 'o',
      description: 'Output format',
      options: ['json', 'yaml'],
      default: 'json',
    }),
    'dry-run': Flags.boolean({
      description: 'Preview request without executing',
      default: false,
    }),
    'no-confirm': Flags.boolean({
      description: 'Skip confirmation prompts',
      default: false,
    }),
    debug: Flags.boolean({
      description: 'Enable debug logging to stderr',
      default: false,
    }),
    'idempotency-key': Flags.string({
      description: 'Unique identifier for idempotent requests',
    }),
  }

  static enableJsonFlag = false

  protected parsedFlags?: BaseFlags
  private cachedAuth?: AuthContext

  private async getFlags(): Promise<BaseFlags> {
    if (!this.parsedFlags) {
      const {flags} = await this.parse(this.constructor as typeof FireblocksBaseCommand)
      this.parsedFlags = flags
    }
    return this.parsedFlags
  }

  protected async resolveAuth(): Promise<AuthContext> {
    if (this.cachedAuth) return this.cachedAuth
    const flags = await this.getFlags()
    const auth = await resolveAuth({
      apiKey: flags['api-key'],
      secretKey: flags['secret-key'],
      profile: flags.profile,
      baseUrl: flags['base-url'],
    })
    this.cachedAuth = auth
    return auth
  }

  protected async confirmOrAbort(method: string, path: string): Promise<void> {
    const flags = await this.getFlags()
    if (flags['no-confirm']) return
    if (!process.stdin.isTTY) return

    const answer = await new Promise<string>((resolve) => {
      const rl = createInterface({input: process.stdin, output: process.stderr})
      rl.question(`About to execute ${method} ${path}. Continue? (y/N) `, (ans) => {
        rl.close()
        resolve(ans)
      })
    })

    if (answer.toLowerCase() !== 'y') {
      this.log('Aborted.')
      return this.exit(0)
    }
  }

  protected async makeRequest(
    method: string,
    path: string,
    options?: RequestOptions & {pathParams?: Record<string, string>},
  ): Promise<unknown> {
    const flags = await this.getFlags()

    // Substitute path parameters
    let resolvedPath = path
    if (options?.pathParams) {
      for (const [key, value] of Object.entries(options.pathParams)) {
        resolvedPath = resolvedPath.replaceAll(`{${key}}`, encodeURIComponent(value))
      }
    }

    const auth = await this.resolveAuth()

    // Dry-run: print request preview and exit
    if (flags['dry-run']) {
      const url = auth.baseUrl + resolvedPath
      const preview = {
        method,
        url,
        queryParams: options?.queryParams,
        body: options?.body,
        headers: options?.headers,
      }

      this.log(formatOutput(preview, flags.output))
      return preview
    }

    if (flags.debug) {
      this.logToStderr(`[DEBUG] ${method} ${auth.baseUrl}${resolvedPath}`)
      if (options?.body) {
        const safeBody = {...options.body as Record<string, unknown>}
        for (const key of ['privateKey', 'secretKey', 'password', 'seed', 'mnemonic', 'secret']) {
          if (key in safeBody) safeBody[key] = '[REDACTED]'
        }
        this.logToStderr(`[DEBUG] Body: ${JSON.stringify(safeBody)}`)
      }
    }

    let response: ApiResponse
    try {
      response = await fireblocksFetch(auth, method, resolvedPath, options)
    } catch (error) {
      const isTimeout =
        (error instanceof DOMException && error.name === 'TimeoutError') ||
        (error instanceof Error && (error.message.includes('ETIMEDOUT') || error.name === 'AbortError'))
      if (isTimeout) {
        this.logToStderr(JSON.stringify({code: EXIT_CODE.TIMEOUT, message: 'Request timed out'}))
        return this.exit(EXIT_CODE.TIMEOUT)
      }

      const message = error instanceof Error ? error.message : String(error)
      this.logToStderr(JSON.stringify({code: EXIT_CODE.GENERAL, message}))
      return this.exit(EXIT_CODE.GENERAL)
    }

    if (flags.debug) {
      this.logToStderr(`[DEBUG] Response: ${response.status}`)
      this.logToStderr(`[DEBUG] Request-ID: ${response.requestId}`)
    }

    // Output response headers if --include-headers is set and the command declares spec-defined headers.
    // Headers are metadata and always go to stderr to keep stdout clean for JSON consumers and pipes.
    const responseHeaderNames = (this.constructor as {responseHeaders?: string[]}).responseHeaders ?? []
    if (responseHeaderNames.length > 0 && (flags as Record<string, unknown>)['include-headers']) {
      const headerLines = formatHeaders(response.headers, responseHeaderNames)
      if (headerLines) {
        this.logToStderr(headerLines)
        this.logToStderr('')
      }
    }

    // Handle HTTP errors
    if (response.status >= 400) {
      const retryAfter = response.headers.get('retry-after')
      const {exitCode, structured} = mapHttpError(
        response.status,
        response.body,
        response.requestId,
        retryAfter,
      )

      this.logToStderr(JSON.stringify(structured))
      return this.exit(exitCode)
    }

    // Output result
    this.log(formatOutput(response.body, flags.output))
    return response.body
  }
}
