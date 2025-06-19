<script setup lang="ts">
import { VPLink } from '../components/VP'
import { useData } from '../composables/data'

const { page } = useData()
</script>

<template>
  <h1>All Blog Posts</h1>
  <ul>
    <li v-for="(tag, index) of page.tagList" :key="index">
      <VPLink :href="tag.url">
        {{ tag.name }}
      </VPLink>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
