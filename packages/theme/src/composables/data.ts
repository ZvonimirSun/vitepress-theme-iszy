import type { BlogConfig } from '../../types'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<BlogConfig> = useData$
