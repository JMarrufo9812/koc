<template>
  <div class="px-10">
    <p class="font2em text-uppercase my-20 text-primary text-bold text-center">
      Carga de datos de acceso a pista
    </p>
    <div class="flex flex-wrap">
      <div class="flex-grow-1 m-10">
        <div class="background-light p-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Usuario:</span>
          </div>
          <div class="min-width-50">
            <FieldText v-model="credentials.user_name" />
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Contraseña:</span>
          </div>
          <div class="min-width-50">
            <FieldText v-model="credentials.password" />
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center flex-wrap">
          <div class="flex flex-grow-1 my-5">
            <span class="font1-5em text-bold">Carga de derechos</span>
          </div>
          <div class="flex justify-center flex-grow-1 my-5">
            <Button :styleBtn="'padding: 0px'">
              <template #button-content>
                <label for="inputFile">
                  <div class="flex align-center justify-center" style="padding: .8em; cursor: pointer;">
                    <Spinner v-if="loadingImportPilots" style="color: #ffff; position: relative; font-size: 1em; margin-right: 5px;"/>
                    <Excel v-else :h="25" :w="25" :color="'#ffff'" />
                    <span class="font1-5em text-white pl-5">Cargar excel</span>
                  </div>
                </label>
              </template>
            </Button>
            <input 
              id="inputFile"
              type="file" 
              accept=".xlsx, .xls, .csv"
              @change="uploadListPilots($event)" 
              style="visibility: hidden; position: fixed;"
              :key="keyInputFile"
            > 
          </div>
          <div class="flex align-center justify-center flex-grow-1 my-5">
            <MicrosoftExcel :h="25" :w="25" />
            <span
              @click="downloadTemplate"
              class="font1-5em text-bold text-primary-light pl-5 text-underline text-pointer"
            >
              Descargar plantilla
            </span>
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Derechos</span>
          </div>
          <div class="">
            <Button @click="downloadPilotsList" :color="'primary'">
              <template #button-content>
                <div class="flex align-center justify-center">
                  <span class="font1-5em text-white pl-5">
                    Consultar derechos
                  </span>
                </div>
              </template>
            </Button>
          </div>
        </div>
        <div class="background-light p-10 mt-10">
          <div class="pb-10">
            <span class="font1-5em text-bold">Registro de ingresos</span>
          </div>
          <div class="flex flex-wrap">
            <div class="flex align-center my-10">
              <span class="font1-5em pr-5"> Fecha inicio </span>
              <FieldDate v-model="period.date_ini" :showPrepend="true" :name="'date_ini'">
                <template #prepend>
                  <ArrowLeft style="font-size: 23px"></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex align-center my-10">
              <span class="font1-5em pr-5"> Fecha fin </span>
              <FieldDate v-model="period.date_end" :showPrepend="true" :name="'date_end'">
                <template #prepend>
                  <ArrowLeft style="font-size: 23px"></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex flex-grow-1 justify-center my-10">
              <Button @click="downloadCheckInReport" :text="'Descargar'" />
            </div>
          </div>
        </div>
        <div class="background-light p-10 mt-10">
          <div class="flex flex-col">
            <span class="font1-5em text-bold pb-10 max-width-600">
              Carga de foto de piloto
            </span>
            <span class="font1-5em max-width-600">
              Recuerda renombrar la imagen para que contenga únicamente el
              numero de derecho y su extensión. Ej: 10005.jpg
            </span>
          </div>
          <div class="my-10">
            <FileUpload :credentials="credentials" />
          </div>
        </div>
      </div>
      <div
        class="background-light flex-grow-5 m-10 min-height-500 flex"
      >
        <BaseTable :headers="headers" :items="listPilots" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import Button from "@/components/ui/Button.vue";
import FieldText from "@/components/ui/fields/FieldText.vue";
import FieldDate from "@/components/ui/fields/FieldDate.vue";
import Excel from "@/assets/icons/Excel.vue";
import MicrosoftExcel from "@/assets/icons/MicrosoftExcel.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import FileUpload from "@/components/ui/fields/FileUpload.vue";
import Spinner from "@/components/ui/Spinner.vue"

import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

import { downloadDocument, convertDateFormat, scrollTop } from "@/utils"

import { GeneralRequests } from "@/services/general.services";

const GeneralServices = new GeneralRequests();


const headers = ref([
  {
    text: "No. Derecho",
    value: "code",
  },
  {
    text: "Piloto",
    value: "name",
  },
  {
    text: "Pit",
    value: "place",
  },
  {
    text: "Status",
    value: "status",
  },
  {
    text: "Nivel",
    value: "level",
  },
]);


const credentials = ref({
  user_name: "",
	password: "",
})


const listPilots = ref([]);

async function loadPilots() {
  GeneralServices.getPilots()
    .then((data) => {
      listPilots.value = data.data;
    })
    .catch(() => {});
}


async function downloadTemplate () {
  GeneralServices.downloadPilotsTemplate(credentials.value)
    .then((data) => {
      downloadDocument(data.data.data.download_url)
    })
    .catch((error) => {
      appStore.handleModalError({ show: true, messages: error.response.data.message})
    });
}


const period = ref({
  date_ini: '',
  date_end: ''
})

async function downloadCheckInReport () {
  const periodFormat = {
    date_ini: convertDateFormat(period.value.date_ini),
    date_end: convertDateFormat(period.value.date_end)
  }

  const params = {
    credentials: credentials.value,
    period: periodFormat
  }

  GeneralServices.downloadChekInReport(params)
    .then((data) => {
      downloadDocument(data.data.data.download_url)
    })
    .catch((error) => {
      appStore.handleModalError({ show: true, messages: error.response.data.message})
    });
}


async function downloadPilotsList() {
  GeneralServices.pilotsExport(credentials.value)
    .then((data) => {
      downloadDocument(data.data.data.download_url)
    })
    .catch((error) => {
      appStore.handleModalError({ show: true, messages: error.response.data.message})
    });
}

const loadingImportPilots = ref(false)

const keyInputFile = ref(`${new Date()}`)

async function uploadListPilots(event) {
  loadingImportPilots.value = true
	let formData = new FormData()

  formData.append('user_name', credentials.value.user_name)
  formData.append('password', credentials.value.password)
	formData.append('excel_file', event.target.files[0])


  GeneralServices.pilotsImport(formData)
    .then(() => {
      loadPilots();
    })
    .catch((error) => {
      appStore.handleModalError({ show: true, messages: error.response.data.message})
    })
    .finally(() => {
      keyInputFile.value = `${new Date()}`
      loadingImportPilots.value = false
    })
}

onMounted(async () => {
  await loadPilots();
  scrollTop()
});
</script>

<style scoped>
.background-light {
  background: var(--light);
}
</style>
