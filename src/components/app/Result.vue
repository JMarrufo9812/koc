<template>
  <div class="flex justify-center" :class="`back-${info.type.toLowerCase()}`">
    <div 
      v-if="info.data.message === 'Piloto no encontrado.'" 
      style="height: 100vh" 
      class="flex align-center"
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
      <div class="flex justify-between font1-5em text-light">
        <p> Derecho: {{ info.code }} </p>
        <p> Pit: {{ info.data.data.place }}</p>
      </div>
      <div>
        <span class="font1-5em text-light">{{ info.data.data.name }} </span>
      </div>
      <div class="flex justify-center my-20">
        <img 
          src="https://images.unsplash.com/photo-1573746943513-2f77b829a3b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="race-image"
        />
      </div>
      <div v-if="info.type === 'ERROR'" class="my-30 text-uppercase text-center font1-5em text-light text-bold">
        Negar acceso a pista
      </div>
      <div v-if="info.type === 'SUCCESS'" class="my-30 text-uppercase text-center font1-5em text-light text-bold">
        Nivel: {{ info.data.data.level }}
      </div>
      <div class="flex align-center flex-wrap">
        <div class="flex-grow-1">
          <Stop v-if="info.type === 'ERROR'" :w="30" :h="30"/>
          <Flag v-if="info.type === 'SUCCESS'" :w="30" :h="30"/>
        </div>
        <div v-if="rawDate" class="flex-grow-2 text-right font1-5em text-light">
          <p>Acceso previo:</p>
          <p>{{ formattedDate }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Stop from '@/assets/icons/Stop.vue'
  import Flag from '@/assets/icons/Flag.vue'
  
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
  max-height: 60vh
}
</style>
