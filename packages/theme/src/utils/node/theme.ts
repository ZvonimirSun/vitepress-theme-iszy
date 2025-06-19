import type { BlogConfig, ThemeConfig, UserConfig } from '@zvonimirsun/vitepress-theme/types'
import { cwd } from 'node:process'
import { URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import { resolveUserConfig } from 'vitepress'
import { withCache } from './common'
import { getAllTags, getPostListByPage } from './posts'

export const getThemeConfig = withCache(_getThemeConfig)

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
      'page/:page.md': 'page/:page/index.md',
      'tags/:tag/1.md': 'tags/:tag/index.md',
      'tags/:tag/:page.md': 'tags/:tag/page/:page/index.md',
    },
    async transformPageData(pageData) {
      // 文章索引页面
      if (pageData.filePath === 'index.md' || pageData.filePath.startsWith('page/')) {
        const themeConfig = await getThemeConfig()

        const pageIndex = pageData.params?.page ? Number(pageData.params.page) : 1
        const pageSize = themeConfig.per_page

        return {
          postList: await getPostListByPage(pageIndex, pageSize),
        }
      }
      // 标签云
      if (pageData.filePath === 'tags/index.md') {
        return {
          tagList: await getAllTags(),
        }
      }
      if (pageData.filePath.startsWith('tags/[tag]/')) {
        const themeConfig = await getThemeConfig()
        const pageIndex = pageData.params!.page ? Number(pageData.params!.page) : 1

        const pageSize = themeConfig.per_page
        const tag = pageData.params!.tag

        return {
          basePath: `/tags/${tag.toLowerCase()}`,
          postList: await getPostListByPage(pageIndex, pageSize, {
            tag,
          }),
        }
      }
    },
  }

  const url = new URL(cfg.url)
  extraVPConfig.base = url.pathname
  if (!extraVPConfig.base.endsWith('/')) {
    extraVPConfig.base += '/'
  }

  return extraVPConfig
}

async function _getThemeConfig(): Promise<ThemeConfig> {
  const [userConfig] = (await resolveUserConfig(cwd(), 'build', 'production'))
  return userConfig.themeConfig
}
