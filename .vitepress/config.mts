import { defineConfig } from 'vitepress'
import { getThemeConfig } from '../src/node'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: getThemeConfig({
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
