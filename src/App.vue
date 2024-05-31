<template>
  <Navbar v-if="!appStore.loading" />
  <div>
    <ModalError v-if="appStore.modalError.show" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'

import Navbar from '@/components/ui/Navbar.vue'; 
import ModalError from '@/components/app/modals/ModalError.vue'

import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

</script>