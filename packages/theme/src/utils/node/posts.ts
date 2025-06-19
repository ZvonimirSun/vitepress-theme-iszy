import type { PostInfo, PostList, TagInfo } from '@zvonimirsun/vitepress-theme/types'
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
  posts.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
  return posts
}

export async function getPostListByPage(pageIndex: number, pageSize: number, {
  tag,
  category,
}: {
  tag?: string
  category?: string
} = {}): Promise<PostList> {
  let posts = await getPosts()
  if (tag) {
    posts = posts.filter(post => post.tags.map(tag => tag.toLowerCase()).includes(tag.toLowerCase()))
  }
  if (category) {
    posts = posts.filter(post => post.categories.map(map => map.toLowerCase()).includes(category.toLowerCase()))
  }
  const pageCount = Math.ceil(posts.length / pageSize)
  posts = posts.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    pageCount,
    pageIndex,
    pageSize,
    posts,
  }
}

export async function getAllTags(): Promise<TagInfo[]> {
  const posts = await getPosts()
  const tagMap: Record<string, TagInfo> = {}
  for (const post of posts) {
    const tags = post.tags || []
    for (const tag of tags) {
      const lowerCaseTag = tag.toLowerCase()
      if (!tagMap[lowerCaseTag]) {
        tagMap[lowerCaseTag] = {
          name: tag,
          url: `/tags/${lowerCaseTag}/`,
          weight: 0,
        }
      }
      tagMap[lowerCaseTag].weight++
    }
  }
  return Object.keys(tagMap).map((tag) => {
    return tagMap[tag]
  })
}
