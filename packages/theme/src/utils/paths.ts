import { defineRoutes } from 'vitepress'
import { getPosts } from './posts'
import { getThemeConfig } from './theme'

export function indexPaths() {
  return defineRoutes({
    async paths() {
      const themeConfig = await getThemeConfig()
      const posts = await getPosts()

      const count = posts.length
      const pageSize = themeConfig.per_page
      const pageCount = Math.ceil(count / pageSize)
      return Array.from({ length: pageCount - 1 }).map((_, i) => ({
        params: {
          page: (i + 2).toString(),
        },
      }))
    },
  })
}
