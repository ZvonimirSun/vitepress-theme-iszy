import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vitepress Theme ISZY",
  description: "A Vitepress theme for blog",
  vite: {
    plugins: [
      UnoCSS()
    ]
  }
})
