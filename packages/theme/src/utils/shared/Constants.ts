import type { ThemeConfig } from 'vitepress-theme-iszy/types'

export const DEFAULT_THEME_CONFIG: Omit<ThemeConfig, 'url'> = {
  language: 'zh-CN',

  scheme: 'Gemini',

  // Directory
  source_dir: './source',
  public_dir: './public',
  tag_dir: 'tags',
  archive_dir: 'archives',
  category_dir: 'categories',

  // Writing
  default_layout: 'post',

  // Pagination
  per_page: 10,

  font: {
    enable: true,

    global: {
      family: 'Lato',
    },
  },

  motion: {
    enable: false,
  },
}
