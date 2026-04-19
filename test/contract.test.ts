import {existsSync, readdirSync, readFileSync} from 'node:fs'
import {join} from 'node:path'

const COMMANDS_DIR = join(__dirname, '..', 'src', 'commands')

describe('contract: generated CLI structure', () => {
  it('has generated command directories (namespaces)', () => {
    const entries = readdirSync(COMMANDS_DIR, {withFileTypes: true})
    const dirs = entries.filter((e) => e.isDirectory())
    expect(dirs.length).toBeGreaterThan(10)
  })

  it('has hand-written commands', () => {
    expect(existsSync(join(COMMANDS_DIR, 'configure.ts'))).toBe(true)
    expect(existsSync(join(COMMANDS_DIR, 'whoami.ts'))).toBe(true)
    expect(existsSync(join(COMMANDS_DIR, 'help-index.ts'))).toBe(true)
  })

  it('generated commands extend FireblocksBaseCommand', () => {
    const namespaces = readdirSync(COMMANDS_DIR, {withFileTypes: true})
      .filter((e) => e.isDirectory())

    let checked = 0
    for (const ns of namespaces) {
      const files = readdirSync(join(COMMANDS_DIR, ns.name)).filter((f) => f.endsWith('.ts'))
      for (const file of files.slice(0, 3)) {
        const content = readFileSync(join(COMMANDS_DIR, ns.name, file), 'utf-8')
        expect(content).toContain('FireblocksBaseCommand')
        expect(content).toContain("from '../../lib/base-command.js'")
        checked++
      }
    }

    expect(checked).toBeGreaterThan(10)
  })

  it('getTransactions has responseHeaders and include-headers flag', () => {
    const txFile = join(COMMANDS_DIR, 'transactions', 'get-transactions.ts')
    expect(existsSync(txFile)).toBe(true)

    const content = readFileSync(txFile, 'utf-8')
    expect(content).toContain('static responseHeaders: string[]')
    expect(content).toContain('next-page')
    expect(content).toContain('prev-page')
    expect(content).toContain("'include-headers': Flags.boolean(")
  })

  it('commands without response headers do not have include-headers flag', () => {
    // whoami is a hand-written command without responseHeaders
    const whoamiContent = readFileSync(join(COMMANDS_DIR, 'whoami.ts'), 'utf-8')
    expect(whoamiContent).not.toContain('include-headers')
    expect(whoamiContent).not.toContain('responseHeaders')
  })

  it('write commands have --data flag', () => {
    const namespaces = readdirSync(COMMANDS_DIR, {withFileTypes: true})
      .filter((e) => e.isDirectory())

    let writeCommands = 0
    for (const ns of namespaces) {
      const files = readdirSync(join(COMMANDS_DIR, ns.name)).filter((f) => f.endsWith('.ts'))
      for (const file of files) {
        const content = readFileSync(join(COMMANDS_DIR, ns.name, file), 'utf-8')
        if (content.includes("static method = 'POST'") || content.includes("static method = 'PUT'")) {
          if (content.includes("flags.data")) {
            writeCommands++
          }
        }
      }
    }

    expect(writeCommands).toBeGreaterThan(10)
  })
})
