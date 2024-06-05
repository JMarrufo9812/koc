<template>
  <div>
    <div v-if="!appStore.loading" class="flex justify-center">
      <div class="container">
        <template v-if="view === 'SCAN'">
          <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
            Escaneo de derecho
          </p>
          <FieldText 
            v-model="search"
            :cleareble="true"
            class="my-10"
            @keyup.enter="searchHandler"
          />
          <Button 
            :text="'Buscar'" 
            @click="!search ? '' : searchHandler()" 
            :disabled="!search"
          />
          <div class="flex justify-center">
            <CodeScanner class="mt-10" @result="handlerScan"/>
          </div>
        </template>
      </div>
    </div>
    <template v-if="!appStore.loading && view === 'RESULT'">
      <Result :info="resultInfo" />
    </template>
    <Loading v-if="appStore.loading" />
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import CodeScanner from "@/components/ui/CodeScanner.vue";
import FieldText from "@/components/ui/fields/FieldText.vue";
import Loading from "@/components/ui/Loading.vue";
import Result from "@/components/app/Result.vue";

import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

import { ref, onMounted } from "vue";

import { GeneralRequests } from "@/services/general.services";

import { scrollTop } from "@/utils"

const GeneralServices = new GeneralRequests()


const view = ref('SCAN')

const search = ref("");

const resultInfo = ref({})

function handlerScan(value) {
  search.value = value
  searchHandler()
}

async function searchHandler () {
  appStore.handleLoading(true)

   GeneralServices.pilotCheckIn({ code: search.value })
    .then((res) => {
     resultInfo.value = {
        type: 'SUCCESS',
        code: search.value,
        data: res.data
      }
    }).catch((err) => {
      resultInfo.value = {
        type: 'ERROR',
        code: search.value,
        data: err.response.data
      }
    }).finally(() => {
      view.value = 'RESULT'
      appStore.handleLoading(false)
      appStore.handleShowScannerIcon(true)
      scrollTop()
    })
}

onMounted(() => {
  scrollTop()
});
</script>