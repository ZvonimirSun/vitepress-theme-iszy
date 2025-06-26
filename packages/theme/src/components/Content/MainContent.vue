<script setup lang="ts">
import { useData } from '../../composables/data'
import Comments from '../Common/Comments.vue'
import IndexContent from './IndexContent.vue'
import PageContent from './PageContent.vue'
import PostContent from './PostContent.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="main-inner">
    <IndexContent v-if="frontmatter.layout === 'home'" />
    <PostContent v-if="!frontmatter.layout" />
    <PageContent v-else />
    <Comments />
  </div>
</template>

<style scoped lang="scss">
</style>
