import type { UserConfig } from 'vitepress'
import type * as Theme from './types/blog'
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
    outDir: './dist',

    markdown: {
      image: {
        lazyLoading: true,
      },
    },
    vite: {
      plugins: [
        UnoCSS(),
      ],
    },

    themeConfig: {
      search: {
        provider: 'local',
      },
    },

    metaChunk: true,
    ignoreDeadLinks: true,
    rewrites: {
      // 文章目录
      '_posts/:name.md': 'posts/:name/index.md',
    },
  }

  const url = new URL(cfg.url)
  extraVPConfig.base = url.pathname
  if (!extraVPConfig.base.endsWith('/')) {
    extraVPConfig.base += '/'
  }

  return extraVPConfig
}
