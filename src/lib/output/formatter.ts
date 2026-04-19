import {dump} from 'js-yaml'

export function formatOutput(data: unknown, format: string = 'json'): string {
  if (format === 'yaml') {
    return dump(data, {indent: 2, lineWidth: -1})
  }
  return JSON.stringify(data, null, 2)
}
