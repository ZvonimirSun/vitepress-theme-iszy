<script setup lang="ts">
import { useData } from '../../composables/data'
import { VPLink } from '../VP'

const { theme } = useData()
</script>

<template>
  <header>
    <VPLink href="/">
      首页
    </VPLink>
    <VPLink :href="`/${theme.tag_dir}/`">
      标签
    </VPLink>
    <VPLink :href="`/${theme.category_dir}/`">
      分类
    </VPLink>
    <VPLink href="/archives/">
      归档
    </VPLink>
  </header>
</template>

<style scoped lang="scss">

</style>
