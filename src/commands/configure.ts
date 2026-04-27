import {Command, Flags} from '@oclif/core'
import {createInterface} from 'node:readline'
import {access, constants} from 'node:fs/promises'
import {resolve} from 'node:path'
import {readConfig, writeConfig, getConfigPath, DEFAULT_BASE_URL} from '../lib/auth/config.js'
import type {CliConfig} from '../lib/auth/config.js'

const BASE_URL_OPTIONS = [
  {label: 'Production (US)    https://api.fireblocks.io', value: 'https://api.fireblocks.io'},
  {label: 'Production (EU)    https://eu-api.fireblocks.io', value: 'https://api.eu.fireblocks.io'},
  {label: 'Production (EU2)   https://eu2-api.fireblocks.io', value: 'https://api.eu2.fireblocks.io'},
  {label: 'Sandbox            https://sandbox-api.fireblocks.io', value: 'https://sandbox-api.fireblocks.io'},
]

function prompt(rl: ReturnType<typeof createInterface>, question: string): Promise<string> {
  return new Promise((res) => {
    rl.question(question, (answer) => res(answer.trim()))
  })
}

async function promptBaseUrl(rl: ReturnType<typeof createInterface>): Promise<string> {
  const lines = BASE_URL_OPTIONS.map((opt, i) => `  ${i + 1}) ${opt.label}`).join('\n')
  process.stderr.write(`Select base URL:\n${lines}\n`)
  const defaultIndex = BASE_URL_OPTIONS.findIndex((o) => o.value === DEFAULT_BASE_URL)
  while (true) {
    const answer = await prompt(rl, `Choice [${defaultIndex + 1}]: `)
    if (answer === '') return DEFAULT_BASE_URL
    const idx = parseInt(answer, 10) - 1
    if (idx >= 0 && idx < BASE_URL_OPTIONS.length) return BASE_URL_OPTIONS[idx].value
    process.stderr.write(`Please enter a number between 1 and ${BASE_URL_OPTIONS.length}.\n`)
  }
}

export default class Configure extends Command {
  static override description = 'Set up Fireblocks API credentials interactively'

  static override examples = [
    '$ fireblocks configure',
    '$ fireblocks configure --profile staging',
  ]

  static override flags = {
    profile: Flags.string({
      description: 'Named credential profile to configure',
      default: 'default',
    }),
    'set-default': Flags.string({
      description: 'Set the named profile as the default without re-entering credentials',
    }),
  }

  async run(): Promise<void> {
    const {flags} = await this.parse(Configure)

    // --set-default: just flip the default profile and exit
    if (flags['set-default']) {
      const profileName = flags['set-default']
      const existing = await readConfig()
      if (!existing) {
        this.error('No config file found. Run `fireblocks configure` first.')
      }
      if (!existing.profiles[profileName]) {
        const known = Object.keys(existing.profiles).join(', ')
        this.error(`Profile "${profileName}" not found. Known profiles: ${known}`)
      }
      existing.defaultProfile = profileName
      await writeConfig(existing)
      this.log(`Default profile set to "${profileName}".`)
      return
    }

    const profileName = flags.profile
    const rl = createInterface({input: process.stdin, output: process.stderr})

    try {
      // Check for existing config and warn if overwriting
      const existing = await readConfig()
      if (existing?.profiles[profileName]) {
        const answer = await prompt(
          rl,
          `Profile "${profileName}" already exists in ${getConfigPath()}. Overwrite? (y/N) `,
        )
        if (answer.toLowerCase() !== 'y') {
          this.log('Aborted.')
          return
        }
      }

      // Prompt for credentials
      const apiKey = await prompt(rl, 'Fireblocks API key: ')
      if (!apiKey) {
        this.error('API key is required.')
      }

      const privateKeyPath = await prompt(rl, 'Path to RSA private key file: ')
      if (!privateKeyPath) {
        this.error('Private key path is required.')
      }

      // Resolve and validate the private key file
      const resolvedKeyPath = resolve(privateKeyPath)
      try {
        await access(resolvedKeyPath, constants.R_OK)
      } catch {
        this.error(`Cannot read private key file: ${resolvedKeyPath}`)
      }

      const baseUrl = await promptBaseUrl(rl)

      // Build config
      const config: CliConfig = existing ?? {profiles: {}, defaultProfile: profileName}
      config.profiles[profileName] = {apiKey, privateKeyPath: resolvedKeyPath, baseUrl}

      // First profile always becomes default; subsequent profiles ask
      if (Object.keys(config.profiles).length === 1) {
        config.defaultProfile = profileName
      } else if (config.defaultProfile !== profileName) {
        const makeDefault = await prompt(rl, `Make "${profileName}" the default profile? (y/N) `)
        if (makeDefault.toLowerCase() === 'y') {
          config.defaultProfile = profileName
        }
      }

      await writeConfig(config)

      this.log(`Profile "${profileName}" configured successfully.`)
      this.log(`Config written to ${getConfigPath()}`)
    } finally {
      rl.close()
    }
  }
}
