import {readFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import {join, dirname} from 'node:path'

let _cliVersion: string | undefined

export function getCliVersion(): string {
  if (_cliVersion !== undefined) return _cliVersion
  try {
    const here = dirname(fileURLToPath(import.meta.url))
    const pkg = JSON.parse(readFileSync(join(here, '..', '..', 'package.json'), 'utf-8')) as {version: string}
    _cliVersion = pkg.version
  } catch {
    _cliVersion = 'unknown'
  }
  return _cliVersion
}
