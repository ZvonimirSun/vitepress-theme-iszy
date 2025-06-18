import { getThemeConfig } from '@zvonimirsun/vitepress-theme/node'
import { defineRoutes } from 'vitepress'

export default defineRoutes({
  async paths(watchedFiles: string[]) {
    const themeConfig = await getThemeConfig()

    const count = watchedFiles.length
    const pageSize = themeConfig.per_page
    const pageCount = Math.ceil(count / pageSize)
    return Array.from({ length: pageCount - 1 }).map((_, i) => ({
      params: {
        page: (i + 2).toString(),
      },
    }))
  },
  watch: ['source/_posts/**/*.md'],
})
