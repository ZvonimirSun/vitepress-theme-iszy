export interface BlogConfig {
  // Site
  title?: string
  subtitle?: string
  description?: string
  keywords?: string
  author?: string
  language?: string
  timezone?: string

  // URL
  url: string

  // Directory
  source_dir?: string
  public_dir?: string
  tag_dir?: string
  archive_dir?: string
  category_dir?: string

  // Writing
  default_layout?: string

  // Pagination
  per_page?: number

  scheme?: string

  font?: {
    enable?: boolean

    global?: {
      family?: string
    }
  }

  motion?: {
    enable?: boolean
  }

  [key: string]: any
}

export interface ThemeConfig extends BlogConfig {
  language: string

  source_dir: string
  public_dir: string
  tag_dir: string
  archive_dir: string
  category_dir: string

  default_layout: string

  per_page: number

  scheme: string

  font: {
    enable: boolean

    global: {
      family: string
    }
  }

  motion: {
    enable: boolean
  }
}

export interface PostInfo {
  url: string
  title: string
  tags: string[]
  categories: string[]
  date: Date
  updated: Date
  frontmatter: any
}

export interface PostList {
  pageCount: number
  pageSize: number
  pageIndex: number
  posts: PostInfo[]
}

export interface TagInfo {
  name: string
  alias: string
  url: string
  weight: number
}

export interface CategoryInfo {
  name: string
  alias: string
  url: string
}
