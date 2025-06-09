import type { BlogConfig } from '../types/blog'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<BlogConfig> = useData$
