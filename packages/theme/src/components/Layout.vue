<script setup lang="ts">
import { Content, useData } from 'vitepress'
import Footer from './footer/index.vue'
import Header from './header/index.vue'
import PostList from './PostList.vue'

const { frontmatter } = useData()
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
      <Content v-else />
    </div>
  </main>
  <footer>
    <Footer />
  </footer>
</template>

<style lang="scss" scoped>
</style>
