import type { Theme } from 'vitepress'
import Layout from './components/Layout.vue'

import './styles/var.css'

const theme: Theme = {
  Layout,
}

export type * from 'vitepress-theme-iszy/types'

export default theme
