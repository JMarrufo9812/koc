<template>
  <div class="flex justify-center" :class="`back-${info.type.toLowerCase()}`">
    <div class="container">
      <div 
        v-if="info.data.message === 'Piloto no encontrado.'" 
        style="height: 100vh" 
        class="flex justify-center"
      >
        <div class="font1-5em text-light">
            <p class="text-center font1-5em text-light text-bold"> Derecho: {{ info.code }} </p>
            <div class="flex justify-center py-20">
              <Stop :w="45" :h="45"/>
            </div>
            <p class="text-center font1-5em text-light text-bold">
              Derecho inexistente
            </p>
            <p class="text-center font1-5em text-light text-bold">
              Negar acceso a pista
            </p>
        </div>
      </div>
      <div v-else style="height: 100vh">
        <div class="flex justify-between font1-5em text-light pb-5 pt-20">
          <span> Derecho: {{ info.code }} </span>
          <span>{{ info.data.data.place }}</span>
        </div>
        <div>
          <span class="font1-5em text-light">{{ info.data.data.name }} </span>
        </div>
        <div class="flex justify-center py-20">
          <img
            v-if="info.data.data.has_images > 0" 
            :src="info.data.data.images.normal"
            class="race-image"
          />
          <div v-else class="race-image">
            <NoImage :w="'100%'" />
          </div>
        </div>
        <div v-if="info.type === 'ERROR'" class="text-uppercase text-center font1-5em text-light text-bold">
          Negar acceso a pista
        </div>
        <div v-if="info.type === 'SUCCESS'" class="text-uppercase text-center font1-5em text-light text-bold flex align-center justify-center">
          <Flag v-if="info.type === 'SUCCESS' && !rawDate" :w="30" :h="30" class="pr-10"/>
          Nivel: {{ info.data.data.level }}
        </div>
        <div class="flex align-center flex-wrap">
          <div class="flex-grow-1">
            <Stop v-if="info.type === 'ERROR'" :w="30" :h="30"/>
            <Flag v-if="info.type === 'SUCCESS' && rawDate" :w="30" :h="30"/>
          </div>
          <div v-if="rawDate" class="flex-grow-2 text-right font1-5em text-light">
            <div class="pb-5">
              <span>Acceso previo:</span>
            </div>
            <span>{{ formattedDate }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Stop from '@/assets/icons/Stop.vue'
  import Flag from '@/assets/icons/Flag.vue'
  import NoImage from '@/assets/images/NoImage.vue'

  import { DateTime } from "luxon";

  const props = defineProps({
    info: {
      type: Object,
      required: true
    },
  })

  const rawDate = props.info.data.data?.last_income_record?.date;
  const formattedDate = rawDate ? DateTime.fromFormat(rawDate, 'yyyy-LL-dd HH:mm:ss').toFormat("dd/MMM/yy h:mm a") : ''

</script>

<style>
.race-image{
  max-width: 100%;
  height: auto;
  max-height: 380px
}
</style>
