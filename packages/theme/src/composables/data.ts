import type { ThemeConfig } from 'vitepress-theme-iszy/types'
import { useData as useData$ } from 'vitepress'

export const useData: typeof useData$<ThemeConfig> = useData$
