<script setup lang="ts">
import { useData } from 'vitepress'
import Header from './header/index.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="headband" />
  <main class="main">
    <div class="column">
      <header class="header">
        <Header />
      </header>
      <Sidebar />
    </div>
  </main>
  <footer />
</template>

<style lang="scss" scoped>
</style>
