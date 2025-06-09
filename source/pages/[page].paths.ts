import { defineRoutes } from 'vitepress'

export default defineRoutes({
  paths(watchedFiles: string[]) {
    const count = watchedFiles.length
    const pageSize = 10
    const pageCount = Math.ceil(count / pageSize)
    return Array.from({ length: pageCount - 1 }).map((_, i) => ({
      params: {
        page: (i + 2).toString(),
      },
    }))
  },
  watch: ['source/_posts/*.md'],
})
