import { createContentLoader } from 'vitepress'

declare const data: any[]
export { data }

export default createContentLoader('_posts/*.md' /* options */)
