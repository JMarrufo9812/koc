<template>
  <div>
    <div v-if="!appStore.loading" class="flex justify-center">
      <div class="container">
        <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
          Escaneo de derecho
        </p>
        <FieldText @input="search = $event" :value="search" class="my-10"/>
        <Button :text="'Buscar'" @click="searchHandler" />
        <p class="font2em text-uppercase my-20 text-gray text-center">
          Enfoca la camara hacia el objetivo
        </p>
        <CodeScanner @result="handlerScan"/>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import CodeScanner from "@/components/ui/CodeScanner.vue";
import FieldText from "@/components/ui/fields/FieldText.vue";
import Loading from "@/components/ui/Loading.vue";

import  { useAppStore } from '@/store/app'

import { ref } from "vue";

const appStore = useAppStore()



const search = ref("");

function handlerScan(value) {
  search.value = value
}

function searchHandler () {
  appStore.handleLoading(true)
}

</script>
