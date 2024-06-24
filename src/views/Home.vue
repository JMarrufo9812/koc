<template>
  <div>
    <div v-if="!appStore.loading" class="flex justify-center">
      <div class="container">
        <template v-if="view === 'SCAN'">
          <div v-if="!accessMode">
            <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
              Escaneo de derecho
            </p>
          </div>
          <div v-if="accessMode" class="flex justify-between align-center">
            <p class="font1-5em text-uppercase text-primary text-bold text-center">
              Control de acceso
            </p>
            <div @click="$router.push({ name: 'guestRegister' })" class="flex align-center font1-5em text-blue text-bold text-center text-pointer">
              <span class="ion-plus-round" style="font-size: 15px"></span>
              <span class="pl-5">
                Invitado
              </span>
            </div>
          </div>
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

import { ref, onMounted, computed } from "vue";
import { scrollTop } from "@/utils"
import { useAppStore } from '@/store/app'
import { PilotsRequests } from "@/services/pilots.services";
import { AccessRequests } from "@/services/access.services";
import { useRoute } from 'vue-router';

const route = useRoute();

const appStore = useAppStore()

const pilotsServices = new PilotsRequests()
const accessServices = new AccessRequests()

const view = ref('SCAN')

const accessMode = computed(() => {
  return route.path === '/access'
})


const resultInfo = ref({})

function handlerScan(value) {
  search.value = value
  searchHandler()
}


const search = ref("");

async function searchHandler() {
  appStore.handleLoading(true);

  try {
    let res = accessMode ? 
      await accessServices.accessCheckIn({ code: search.value }) : 
      await pilotsServices.pilotCheckIn({ code: search.value })

    resultInfo.value = {
      type: 'SUCCESS',
      code: search.value,
      data: res.data
    };
  } catch (err) {
    resultInfo.value = {
      type: 'ERROR',
      code: search.value,
      data: err.response?.data || 'Unknown error'
    };
  } finally {
    view.value = 'RESULT';
    appStore.handleLoading(false);
    appStore.handleShowScannerIcon(true);
    scrollTop();
  }
}

onMounted(() => {
  scrollTop()
});
</script>