import type { CategoryInfo, PostInfo, PostList, TagInfo } from '@zvonimirsun/vitepress-theme/types'
import { readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import matter from 'gray-matter'
import { glob } from 'tinyglobby'
import { withCache } from './common'
import { getThemeConfig } from './theme'

export const getPosts = withCache(_getPosts)
export const getAllTags = withCache(_getAllTags)
export const getAllCategories = withCache(_getAllCategories)

const categoryMap: {
  [key: string]: {
    info: CategoryInfo
    posts: PostInfo[]
  }
} = {}
const tagMap: {
  [key: string]: {
    info: TagInfo
    posts: PostInfo[]
  }
} = {}

export async function getPostListByPage(pageIndex: number, pageSize: number, {
  tag,
  category,
}: {
  tag?: string
  category?: string
} = {}): Promise<PostList> {
  let posts = await getPosts()
  if (tag) {
    posts = tagMap[tag].posts || []
  }
  if (category) {
    posts = categoryMap[category].posts || []
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

export async function getTagInfo(tag: string): Promise<TagInfo> {
  await getPosts()
  return tagMap[tag].info
}

export async function getCategoryInfo(tag: string): Promise<CategoryInfo> {
  await getPosts()
  return categoryMap[tag].info
}

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

    const post = {
      url: `/posts/${file.replace('.md', '/')}`,
      title: frontmatter.title || '',
      tags: frontmatter.tags || [],
      categories: frontmatter.categories || [],
      date: frontmatter.date || stats.birthtime,
      updated: frontmatter.updated || stats.mtime,
      frontmatter,
    }

    for (const tag of post.tags) {
      const lowerCaseTag = tag.toLowerCase()
      if (!tagMap[lowerCaseTag]) {
        tagMap[lowerCaseTag] = {
          info: {
            name: lowerCaseTag,
            alias: tag,
            url: `/tags/${lowerCaseTag}/`,
            weight: 0,
          },
          posts: [],
        }
      }
      tagMap[lowerCaseTag].posts.push(post)
      tagMap[lowerCaseTag].info.weight++
    }

    for (const category of post.categories) {
      const lowerCaseCategory = category.toLowerCase()
      if (!categoryMap[lowerCaseCategory]) {
        categoryMap[lowerCaseCategory] = {
          info: {
            name: lowerCaseCategory,
            alias: category,
            url: `/categories/${lowerCaseCategory}/`,
          },
          posts: [],
        }
      }
      categoryMap[lowerCaseCategory].posts.push(post)
    }

    posts.push(post)
  }
  posts.sort((a, b) => {
    return a.date > b.date ? -1 : 1
  })
  return posts
}

async function _getAllTags(): Promise<TagInfo[]> {
  await getPosts()
  return Object.keys(tagMap).map((tag) => {
    return tagMap[tag].info
  })
}

async function _getAllCategories(): Promise<CategoryInfo[]> {
  await getPosts()
  return Object.keys(categoryMap).map((category) => {
    return categoryMap[category].info
  })
}
