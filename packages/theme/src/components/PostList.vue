<script setup lang="ts">
import { computed } from 'vue'
import { VPLink } from '../components/VP'
import { useData } from '../composables/data'

const { page, theme } = useData()

const pageIndex = computed(() => {
  return page.value.postList.pageIndex
})
const basePath = computed(() => {
  if (page.value.categoryInfo) {
    return `/${theme.value.category_dir}/${page.value.categoryInfo.name}`
  }
  if (page.value.tagInfo) {
    return `/${theme.value.tag_dir}/${page.value.tagInfo.name}`
  }
  return ''
})

const pageCount = page.value.postList.pageCount

const lastPage = computed(() => {
  return pageIndex.value === 2 ? `${basePath.value}/` : `${basePath.value}/page/${pageIndex.value - 1}/`
})

const nextPage = computed(() => {
  return `${basePath.value}/page/${pageIndex.value + 1}/`
})

const title = computed(() => {
  if (page.value.categoryInfo) {
    return '分类'
  }
  if (page.value.tagInfo) {
    return '标签'
  }
  return '首页'
})
</script>

<template>
  <h1>{{ title }}</h1>
  <ul>
    <li v-for="(post, index) of page.postList.posts" :key="index">
      <VPLink :href="post.url">
        {{ post.title }}
      </VPLink>
    </li>
  </ul>
  <div>
    当前第 {{ pageIndex }} 页，共{{ pageCount }}页
  </div>
  <VPLink v-if="pageIndex !== 1" :href="lastPage">
    上一页
  </VPLink>
  <VPLink v-if="pageIndex !== pageCount" :href="nextPage">
    下一页
  </VPLink>
</template>

<style scoped lang="scss"></style>
