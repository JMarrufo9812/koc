<template>
  <header id="header" class="background-navbar">
    <div class="flex align-center justify-center pb-10">
      <img @click="handlerHome" src="@/assets/logos/koc_logo.png" alt="" class="cursor-pointer">
      <Scanner v-if="appStore.showScannerIcon" @click="handlerHome" style="position: absolute; right: 20px; margin-top:5px; cursor: pointer;" />
    </div>
  </header>
</template>

<script setup>
import Scanner from '@/assets/icons/Scanner.vue'

import { useRoute, useRouter } from 'vue-router';
import  { useAppStore } from '@/store/app'

const appStore = useAppStore()
const route = useRoute();
const router = useRouter();

function handlerHome() {
  appStore.handleShowScannerIcon(false)
  if(route.name === 'home' || route.name === 'access') {
    window.location.reload();
  } else if (route.name === 'guestRegister') {
    router.push({ path: '/access' })
  } else {
    router.push({ path: '/' })
  } 
}

</script>

<style lang="scss">

.background-navbar {
  background: var(--primary);
}

img {
  height: 50px;
}

</style>