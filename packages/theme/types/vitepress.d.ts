import type { UserConfig as UserConfig$ } from 'vitepress'
import type { PostList, ThemeConfig } from './blog'

export interface UserConfig extends UserConfig$ {
  themeConfig: ThemeConfig

  lang: string
  srcDir: string
  assetsDir: string
  outDir: string
}

declare module 'vitepress' {
  interface PageData {
    postList: PostList
  }
}
