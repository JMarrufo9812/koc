<template>
  <Navbar v-if="!appStore.loading" />
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'; 

import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

</script>

<style scoped lang="scss">

</style>