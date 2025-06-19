<script setup lang="ts">
import { Content, useData } from 'vitepress'
import CategoryList from './CategoryList.vue'
import Footer from './footer/index.vue'
import Header from './header/index.vue'
import PostList from './PostList.vue'
import TagList from './TagList.vue'

const { frontmatter, page } = useData()
</script>

<template>
  <div class="headband" />
  <main class="main">
    <div class="column">
      <header class="header">
        <Header />
      </header>
    </div>
    <div class="main-inner">
      <PostList v-if="frontmatter.layout === 'home'" />
      <PostList v-else-if="frontmatter.layout === 'tags' && page.tagInfo" />
      <TagList v-else-if="frontmatter.layout === 'tags'" />
      <PostList v-else-if="frontmatter.layout === 'categories' && page.categoryInfo" />
      <CategoryList v-else-if="frontmatter.layout === 'categories'" />
      <Content v-else />
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style lang="scss" scoped>
</style>
