<script setup lang="ts">
import { VPLink } from '../components/VP'
import { useData } from '../composables/data'

const { page } = useData()
</script>

<template>
  <h1>标签</h1>
  <ul>
    <li v-for="(tag) of page.tagList" :key="tag.name">
      <VPLink :href="tag.url">
        {{ tag.name }}
      </VPLink>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
