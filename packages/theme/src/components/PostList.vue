<script setup lang="ts">
import { computed } from 'vue'
import { VPLink } from '../components/VP'
import { useData } from '../composables/data'

const { page } = useData()

const pageIndex = computed(() => {
  return page.value.postList.pageIndex
})
const pageCount = page.value.postList.pageCount

const lastPage = computed(() => {
  return pageIndex.value === 2 ? `/` : `/page/${pageIndex.value - 1}/`
})

const nextPage = computed(() => {
  return `/page/${pageIndex.value + 1}/`
})
</script>

<template>
  <h1>首页</h1>
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
