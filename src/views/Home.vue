<template>
  <div>
    <div v-if="!appStore.loading" class="flex justify-center background-primary">
      <div class="container">
        <template v-if="view === 'SCAN'">
          <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
            Escaneo de derecho
          </p>
          <FieldText @input="search = $event" :value="search" class="my-10"/>
          <Button :text="'Buscar'" @click="searchHandler" />
          <p class="font2em text-uppercase my-20 text-gray text-center">
            Enfoca la camara hacia el objetivo
          </p>
          <CodeScanner @result="handlerScan"/>
        </template>
        <template v-if="view === 'SUCCESS'">
          <div style="height: 100vh;">
            <div class="flex justify-between font1-5em text-light">
              <span>
                Derecho: 0005415651565
              </span>
              <span>
                Pit: 5
              </span>
            </div>
            <div>
              <span class="font1-5em text-light">
                Juan manuel nombre del piloto
              </span>
            </div>
          </div>
        </template>
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

const view = ref('SUCCESS')

const search = ref("");

function handlerScan(value) {
  search.value = value
}

function searchHandler () {
  console.log(search.value)
  appStore.handleLoading(true)
  setTimeout(()=> {
    appStore.handleLoading(false)
  }, 1000)
}

</script>

<style>
.background-primary {
  background: var(--error);
}
</style>