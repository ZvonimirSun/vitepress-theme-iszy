import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import Layout from './components/Layout.vue'
import './styles/index.scss'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme
