import type { PostInfo } from '@zvonimirsun/vitepress-theme/types'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import matter from 'gray-matter'
import { glob } from 'tinyglobby'
import { withCache } from './common'
import { getThemeConfig } from './theme'

export const getPosts = withCache(_getPosts)

async function _getPosts(): Promise<PostInfo[]> {
  const themeConfig = await getThemeConfig()
  const srcDir = themeConfig.source_dir

  // 读取所有 markdown 文件
  const files = await glob(`**/*.md`, {
    cwd: resolve(cwd(), `${srcDir}/_posts`),
    ignore: ['**/node_modules/**', '**/dist/**'],
  })

  const posts: PostInfo[] = []
  for (const file of files) {
    const fullPath = resolve(cwd(), `${srcDir}/_posts`, file)
    const src = readFileSync(fullPath, 'utf-8')

    // 只解析 frontmatter，不渲染内容
    const { data: frontmatter } = matter(src)

    // 获取文件创建时间
    const stats = statSync(fullPath)

    posts.push({
      url: `/posts/${file.replace('.md', '/')}`,
      title: frontmatter.title || '',
      tags: frontmatter.tags || [],
      categories: frontmatter.categories || [],
      date: frontmatter.date || stats.birthtime,
      updated: frontmatter.updated || stats.mtime,
      frontmatter,
    })
  }
  return posts
}
