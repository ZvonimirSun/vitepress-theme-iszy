<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'
import { useData } from '../composables/data'
import { data as posts } from '../data/posts.data'

const route = useRoute()
const router = useRouter()
const data = useData()

const path = route.path
const tmp = path.split('/')

let currentPosts = []

if (tmp[tmp.length - 1] !== '') {
  router.go(path.replace('.html', '/'))
}
else {
  const pageIndex = Number(tmp[tmp.length - 2] || 1)
  const pageSize = data.theme.value.per_page || 10

  currentPosts = posts.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
}
</script>

<template>
  <h1>All Blog Posts</h1>
  <ul>
    <li v-for="(post, index) of currentPosts" :key="index">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
      <span>by {{ post.frontmatter.author }}</span>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
