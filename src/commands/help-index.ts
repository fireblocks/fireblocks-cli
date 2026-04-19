import {Command} from '@oclif/core'

interface CompactFlag {
  name: string
  type: string
  required: boolean
}

interface CompactCommand {
  namespace: string
  action: string
  description: string
  method?: string
  path?: string
  flags: CompactFlag[]
}

export default class HelpIndex extends Command {
  static override description = 'Machine-readable command index for AI agents'

  static override examples = [
    '$ fireblocks help-index',
    '$ fireblocks help-index --json',
  ]

  static override enableJsonFlag = true

  async run(): Promise<{commands: CompactCommand[]}> {
    const commands: CompactCommand[] = []

    for (const cmd of this.config.commands) {
      // Split command id into namespace and action
      // e.g. "vaults list" -> namespace="vaults", action="list"
      // e.g. "configure" -> namespace="configure", action=""
      const parts = cmd.id.split(' ')
      const namespace = parts.length > 1 ? parts.slice(0, -1).join(' ') : cmd.id
      const action = parts.length > 1 ? parts[parts.length - 1] : ''

      // Extract HTTP method and path from description or aliases if available
      // Commands generated from OpenAPI typically encode method/path in metadata
      let method: string | undefined
      let path: string | undefined

      const pluginData = cmd as Record<string, unknown>

      // Check if command stores http metadata (convention from generated commands)
      if (typeof pluginData.method === 'string') method = pluginData.method
      if (typeof pluginData.path === 'string') path = pluginData.path

      // Build compact flags list — only include required flags to keep output small
      const flags: CompactFlag[] = []
      if (cmd.flags) {
        for (const [name, flag] of Object.entries(cmd.flags)) {
          // Skip base flags that every command has (output, debug, etc.)
          if (['output', 'debug', 'json'].includes(name)) continue

          const flagDef = flag as Record<string, unknown>
          flags.push({
            name,
            type: (flagDef.type as string) ?? 'string',
            required: (flagDef.required as boolean) ?? false,
          })
        }
      }

      const entry: CompactCommand = {
        namespace,
        action,
        description: cmd.summary ?? cmd.description ?? '',
        flags,
      }

      if (method) entry.method = method
      if (path) entry.path = path

      commands.push(entry)
    }

    return {commands}
  }
}
