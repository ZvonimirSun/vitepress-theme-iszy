import type { UserConfig } from 'vitepress'
import type * as Theme from './types/config'
import { URL } from 'node:url'
import UnoCSS from 'unocss/vite'

/**
 * 获取主题的配置
 */
export function getThemeConfig(cfg: Theme.BlogConfig) {
  const extraVPConfig: UserConfig = {
    title: cfg.title,
    description: cfg.description,
    lang: cfg.language ?? 'zh-CN',
    srcDir: cfg.source_dir ?? './source',
    assetsDir: cfg.public_dir ?? './public',

    vite: {
      plugins: [
        UnoCSS(),
      ],
    },
  }

  const url = new URL(cfg.url)
  extraVPConfig.base = url.pathname
  if (!extraVPConfig.base.endsWith('/')) {
    extraVPConfig.base += '/'
  }

  return extraVPConfig
}
