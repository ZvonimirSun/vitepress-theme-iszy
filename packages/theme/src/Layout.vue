<script setup lang="ts">
import MainContent from './components/Content/MainContent.vue'
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Widgets from './components/Widgets/Widgets.vue'
import { useData } from './composables/data.ts'

const { theme } = useData()
</script>

<template>
  <div class="theme-container" :class="{ 'use-motion': theme.motion.enable }">
    <div class="headband" />
    <main class="main">
      <div class="column">
        <Header />
        <Sidebar />
      </div>
      <MainContent />
    </main>
    <Footer />
    <Widgets />
  </div>
</template>

<style scoped lang="scss">
</style>
