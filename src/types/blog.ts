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

  [key: string]: any
}
