<template>
  <div>
    <div v-if="!appStore.loading" class="flex justify-center">
      <div class="container">
        <template v-if="view === 'SCAN'">
          <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
            Escaneo de derecho
          </p>
          <FieldText @input="search = $event" :value="search" class="my-10"/>
          <Button :text="'Buscar'" @click="searchHandler" />
          <p class="font2em my-20 text-gray text-center">
            Enfoca la camara hacia el objetivo
          </p>
          <CodeScanner @result="handlerScan"/>
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
import { ref } from "vue";
import { GeneralRequests } from "@/services/general.services";

const GeneralServices = new GeneralRequests()

const appStore = useAppStore()

const view = ref('SCAN')

const search = ref("");

function handlerScan(value) {
  search.value = value
}

const resultInfo = ref({})

async function searchHandler () {
  console.log(search.value)
  appStore.handleLoading(true)

   GeneralServices.pilotCheckIn({ code: search.value })
    .then((res) => {
     console.log(res)
     resultInfo.value = {
        type: 'SUCCESS',
        code: search.value,
        msg: res.data
      }
    }).catch((err) => {
      view.value = 'RESULT'

      resultInfo.value = {
        type: 'ERROR',
        code: search.value,
        msg: err.response.data.message
      }
    }).finally(() => {
      appStore.handleLoading(false)
    })

  // view.value = 'RESPONSE'

}

</script>

<style>
.background-error {
  background: var(--error);
}
</style>