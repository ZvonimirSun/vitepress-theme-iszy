import { defineRoutes } from 'vitepress'
import { getAllCategories, getAllTags, getPostListByPage } from './posts'
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
        route.push(...Array.from({ length: postsList.pageCount }).map((_, i) => ({
          params: {
            tagName: tag.name,
            tag: tag.name.toLowerCase(),
            page: (i + 1).toString(),
          },
        })))
      }
      return route
    },
  })
}

export function categoriesPagePaths() {
  return defineRoutes({
    async paths() {
      const route = []
      const themeConfig = await getThemeConfig()
      const categories = await getAllCategories()
      for (const category of categories) {
        const postsList = await getPostListByPage(1, themeConfig.per_page, {
          category: category.name,
        })
        route.push(...Array.from({ length: postsList.pageCount }).map((_, i) => ({
          params: {
            categoryName: category.name,
            category: category.name.toLowerCase(),
            page: (i + 1).toString(),
          },
        })))
      }
      return route
    },
  })
}
