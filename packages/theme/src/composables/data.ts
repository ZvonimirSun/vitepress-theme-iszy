import type { BlogConfig } from '@zvonimirsun/vitepress-theme/types'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<BlogConfig> = useData$
