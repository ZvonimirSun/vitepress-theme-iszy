import type { ThemeConfig } from '@zvonimirsun/vitepress-theme'
import { generateThemeConfig } from '@zvonimirsun/vitepress-theme/node'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig<ThemeConfig>({
  extends: generateThemeConfig({
    // Site
    title: '随遇而安',
    subtitle: '在自由的空气中漂浮',
    description: '生活吐槽 & 学习记录',
    keywords: '随遇而安, Dirge, iszy',
    author: 'Dirge',
    language: 'zh-CN',

    // URL
    url: 'https://www.iszy.cc',

    footer: {
      since: 2017,
    },
  }),
  markdown: {
    languages: ['js', 'ts', 'vue'],
  },
})
