import type { BlogConfig, ThemeConfig } from '@zvonimirsun/vitepress-theme/types'
import type { UserConfig } from 'vitepress'
import { cwd } from 'node:process'
import { URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { resolveUserConfig } from 'vitepress'

/**
 * 获取主题的配置
 */
export function generateThemeConfig(cfg: BlogConfig) {
  const themeConfig: ThemeConfig = {
    language: 'zh-CN',

    // Directory
    source_dir: './source',
    public_dir: './public',
    tag_dir: 'tags',
    archive_dir: 'archives',
    category_dir: 'categories',

    // Writing
    default_layout: 'post',

    // Pagination
    per_page: 10,

    ...cfg,
  }

  const extraVPConfig: UserConfig = {
    title: themeConfig.title,
    description: themeConfig.description,
    lang: themeConfig.language,
    srcDir: themeConfig.source_dir,
    assetsDir: themeConfig.public_dir,
    outDir: './dist',

    themeConfig: {
      ...themeConfig,
    },

    markdown: {
      image: {
        lazyLoading: true,
      },
    },
    vite: {
      plugins: [
        UnoCSS(),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
          },
        },
      },
    },

    metaChunk: true,
    ignoreDeadLinks: true,
    rewrites: {
      // 文章目录
      '_posts/:name.md': 'posts/:name/index.md',
      'pages/:page.md': 'pages/:page/index.md',
    },
  }

  const url = new URL(cfg.url)
  extraVPConfig.base = url.pathname
  if (!extraVPConfig.base.endsWith('/')) {
    extraVPConfig.base += '/'
  }

  return extraVPConfig
}

export async function getThemeConfig(): Promise<ThemeConfig> {
  const [userConfig] = (await resolveUserConfig(cwd(), 'build', 'production'))
  return userConfig.themeConfig
}
