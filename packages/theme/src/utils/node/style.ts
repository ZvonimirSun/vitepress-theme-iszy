import type { PluginOption } from 'vite'
import type { BlogConfig, ThemeConfig } from 'vitepress-theme-iszy/types'
import { merge } from 'lodash-es'
import { DEFAULT_THEME_CONFIG } from '../shared/Constants'

function toScssMap(obj: Record<string, any>, prefix = ''): string {
  let mapEntries = ''
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue
    }
    const value = obj[key]
    const mapKey = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'object' && value !== null) {
      mapEntries += toScssMap(value, mapKey)
    }
    else {
      mapEntries += `  ${mapKey}: ${JSON.stringify(value)},\n`
    }
  }
  return mapEntries
}

function generateScssConfigMap(themeConfig: Record<string, any>): string {
  const mapBody = toScssMap(themeConfig)
  return `$vitepress_config_map: (\n${mapBody});`
}

export function ThemeStylePlugin(blogConfig: BlogConfig): PluginOption {
  const themeConfig = merge({}, DEFAULT_THEME_CONFIG, blogConfig) as ThemeConfig
  const virtualId = 'virtual:theme.scss'

  return {
    name: 'vite-plugin-virtual-scss',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.scss')) {
        debugger
        console.log('[PLUGIN]', id)
      }
      return null
    },
  }
}
