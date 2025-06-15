import { createContentLoader } from 'vitepress'

declare const data: any[]
export { data }

export default createContentLoader('_posts/*.md', {
  transform(rawData) {
    // 文章按时间排序
    return rawData.sort((a, b) => {
      return (a.frontmatter.date ?? new Date()) > (b.frontmatter.date ?? new Date()) ? -1 : 1
    })
  },
})
