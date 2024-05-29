<template>
  <div class="px-20">
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
            <FieldText />
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Contraseña:</span>
          </div>
          <div class="min-width-50">
            <FieldText />
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Carga de derechos</span>
          </div>
          <div class="min-width-35">
            <Button>
              <template #button-content>
                <div class="flex align-center justify-center">
                  <Excel :h="25" :w="25" :color="'#ffff'" />
                  <span class="font1-5em text-white pl-5">Cargar excel</span>
                </div>
              </template>
            </Button>
          </div>
          <div class="min-width-35 flex align-center justify-center">
            <MicrosoftExcel :h="25" :w="25" />
            <span
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
            <Button :color="'primary'">
              <template #button-content>
                <div class="flex align-center justify-center">
                  <span class="font1-5em text-white pl-5"
                    >Consultar derechos</span
                  >
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
              <FieldDate :showPrepend="true">
                <template #prepend>
                  <ArrowLeft style="font-size: 23px"></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex align-center my-10">
              <span class="font1-5em pr-5"> Fecha fin </span>
              <FieldDate :showPrepend="true">
                <template #prepend>
                  <ArrowLeft style="font-size: 23px"></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex my-10">
              <Button :text="'Descargar'"> </Button>
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
            <Button :for="name">
              <template #button-content>
                <label :for="name" >
                  <h2 class="font1-5em text-white margin-y-none">
                    <span class="ion-plus"></span>
                    Agregar imagenes
                  </h2>
                </label>
              </template>
            </Button>
          </div>
          <div class="flex flex-wrap">
            <div class="p-10 flex-grow-1">
              <Button :text="'Subir todo'" :color="'blue'"> </Button>
            </div>
            <div class="p-10 flex-grow-1">
              <Button :text="'Borrar todo'" :color="'error'"> </Button>
            </div>
          </div>
          <div>
            <FileUpload />
          </div>
        </div>
      </div>
      <div
        class="background-light flex-grow-1 m-10 min-width-50 min-height-500"
      >
        <BaseTable :headers="headers" :items="listPilots" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import FieldText from "@/components/ui/fields/FieldText.vue";
import FieldDate from "@/components/ui/fields/FieldDate.vue";
import Excel from "@/assets/icons/Excel.vue";
import MicrosoftExcel from "@/assets/icons/MicrosoftExcel.vue";
import ArrowLeft from "@/assets/icons/ArrowLeft.vue";
import BaseTable from "@/components/ui/BaseTable.vue";
import FileUpload from "@/components/ui/fields/FileUpload.vue";

import { GeneralRequests } from "@/services/general.services";
import { onMounted, onBeforeUnmount } from "vue";

const GeneralServices = new GeneralRequests();

import { ref } from "vue";

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

const listPilots = ref([]);

async function loadPilots() {
  GeneralServices.getPilots()
    .then((data) => {
      listPilots.value = data.data;
    })
    .catch(() => {});
}

onMounted(async () => {
  await loadPilots();
});

const name = 'file'
</script>

<style scoped>
.background-light {
  background: var(--light);
}
</style>
