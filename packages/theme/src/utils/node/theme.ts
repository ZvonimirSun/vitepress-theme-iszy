import type { BlogConfig, ThemeConfig, UserConfig } from 'vitepress-theme-iszy/types'
import { cwd } from 'node:process'
import { URL } from 'node:url'
import { merge } from 'lodash-es'
import UnoCSS from 'unocss/vite'
import { resolveUserConfig } from 'vitepress'
import { DEFAULT_THEME_CONFIG } from '../shared/Constants'
import { withCache } from './common'
import { getAllCategories, getAllTags, getCategoryInfo, getPostListByPage, getTagInfo } from './posts'
import { ThemeStylePlugin } from './style'

export const getThemeConfig = withCache(_getThemeConfig)

/**
 * 获取主题的配置
 */
export function generateThemeConfig(cfg: BlogConfig) {
  const themeConfig = merge({}, DEFAULT_THEME_CONFIG, cfg) as ThemeConfig

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
        ThemeStylePlugin(themeConfig),
      ],
    },

    metaChunk: true,
    ignoreDeadLinks: true,
    rewrites: {
      // 文章目录
      '_posts/:name.md': 'posts/:name/index.md',

      // 文章索引
      'index/1.md': 'index.md',
      'index/:page.md': 'page/:page/index.md',

      // 标签页
      'tags/index.md': `${themeConfig.tag_dir}/index.md`,
      'tags/:tag/1.md': `${themeConfig.tag_dir}/:tag/index.md`,
      'tags/:tag/:page.md': `${themeConfig.tag_dir}/:tag/page/:page/index.md`,

      // 分类页
      'categories/index.md': `${themeConfig.category_dir}/index.md`,
      'categories/:category/1.md': `${themeConfig.category_dir}/:category/index.md`,
      'categories/:category/:page.md': `${themeConfig.category_dir}/:category/page/:page/index.md`,

      // 归档页
      'archives/1.md': 'archives/index.md',
      'archives/:page.md': 'archives/page/:page/index.md',
    },
    async transformPageData(pageData) {
      const themeConfig = await getThemeConfig()
      const pageIndex = pageData.params?.page ? Number(pageData.params.page) : 1
      const pageSize = themeConfig.per_page

      // 文章索引页面
      if (pageData.filePath.startsWith('index/') || pageData.filePath.startsWith('archives/')) {
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
      if (pageData.filePath.startsWith('tags/')) {
        const tag = pageData.params!.tag
        const tagInfo = await getTagInfo(tag)

        pageData.title = `标签: ${tagInfo.alias}`

        return {
          tagInfo,
          postList: await getPostListByPage(pageIndex, pageSize, {
            tag,
          }),
        }
      }
      if (pageData.filePath === 'categories/index.md') {
        return {
          categoryList: await getAllCategories(),
        }
      }
      if (pageData.filePath.startsWith('categories/')) {
        const category = pageData.params!.category
        const categoryInfo = await getCategoryInfo(category)

        pageData.title = `分类: ${categoryInfo.alias}`

        return {
          categoryInfo,
          postList: await getPostListByPage(pageIndex, pageSize, {
            category,
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
