<script setup lang="ts">
import { VPLink } from '../components/VP'
import { useData } from '../composables/data'

const { page } = useData()
</script>

<template>
  <h1>分类</h1>
  <ul>
    <li v-for="(category) of page.categoryList" :key="category.name">
      <VPLink :href="category.url">
        {{ category.name }}
      </VPLink>
    </li>
  </ul>
</template>

<style scoped lang="scss"></style>
