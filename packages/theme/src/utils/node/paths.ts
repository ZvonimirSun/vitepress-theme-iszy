import { defineRoutes } from 'vitepress'
import { getAllTags, getPostListByPage } from './posts'
import { getThemeConfig } from './theme'

export function pagePaths() {
  return defineRoutes({
    async paths() {
      const themeConfig = await getThemeConfig()
      const postsList = await getPostListByPage(1, themeConfig.per_page)

      return Array.from({ length: postsList.pageCount - 1 }).map((_, i) => ({
        params: {
          page: (i + 2).toString(),
        },
      }))
    },
  })
}

export function tagsPaths() {
  return defineRoutes({
    async paths() {
      const tags = await getAllTags()
      return tags.map(tag => ({
        params: {
          tag: tag.name.toLowerCase(),
          page: '1',
        },
      }))
    },
  })
}

export function tagsPagePaths() {
  return defineRoutes({
    async paths() {
      const route = []
      const themeConfig = await getThemeConfig()
      const tags = await getAllTags()
      for (const tag of tags) {
        const postsList = await getPostListByPage(1, themeConfig.per_page, {
          tag: tag.name,
        })
        route.push(...Array.from({ length: postsList.pageCount - 1 }).map((_, i) => ({
          params: {
            tag: tag.name.toLowerCase(),
            page: (i + 2).toString(),
          },
        })))
      }
      return route
    },
  })
}
