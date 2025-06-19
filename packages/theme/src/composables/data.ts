import type { ThemeConfig } from '@zvonimirsun/vitepress-theme/types'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<ThemeConfig> = useData$
