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
            <FieldText  />
          </div>
        </div>
        <div class="background-light p-10 mt-10 flex align-center">
          <div class="min-width-30">
            <span class="font1-5em text-bold">Contraseña:</span>
          </div>
          <div class="min-width-50">
            <FieldText  />
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
            <span class="font1-5em text-bold text-primary-light pl-5 text-underline text-pointer">
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
                  <span class="font1-5em text-white pl-5">Consultar derechos</span>
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
              <span class="font1-5em pr-5">
                Fecha inicio
              </span>
              <FieldDate :showPrepend="true">
                <template #prepend>
                  <ArrowLeft
                    style="font-size: 23px;"
                  ></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex align-center my-10">
              <span class="font1-5em pr-5">
                Fecha fin
              </span>
              <FieldDate :showPrepend="true">
                <template #prepend>
                  <ArrowLeft
                    style="font-size: 23px;"
                  ></ArrowLeft>
                </template>
              </FieldDate>
            </div>
            <div class="flex my-10">
              <Button :text="'Descargar'">
              </Button>
            </div>
          </div>
        </div>
        <div class="background-light p-10 mt-10">
          <div class="flex pb-10">
            <span class="font1-5em text-bold">Carga de foto de piloto</span>
          </div>
          <div class="flex">
            <span class="font1-5em">
              Recuerda renombrar la imagen para que contenga únicamente el numero de
              derecho y su extensión. Ej: 10005.jpg
            </span>
          </div>
        </div>
      </div>
      <div class="background-light flex-grow-1 m-10 min-width-50 min-height-500">
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
import ArrowLeft from "@/assets/icons/ArrowLeft.vue"
</script>

<style scoped>
.background-light {
  background: var(--light);
}
</style>