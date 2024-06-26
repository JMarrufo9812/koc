<template>
  <div class="flex justify-center" :class="backgroundColor">
    <div class="container">
      <div 
        v-if="props.info.type === 'REGISTER_GUEST_SUCCESS'" 
        style="height: 100vh" 
        class="flex justify-center"
      >
        <div style="margin-top: 50%">
          <p class="text-center font1-5em text-light text-bold">
            Membresía: {{ info.data.code }}
          </p>
          <div class="text-center">
            <Flag :w="30" :h="30"/>
          </div>
          <p class="text-center font1-5em text-light text-bold">
            INVITADO REGISTRADO
          </p>
        </div>
      </div>
      <div 
        v-if="notFound" 
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
      <div v-if="!notFound && props.info.type !== 'REGISTER_GUEST_SUCCESS'" style="height: 100vh">
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
        <div v-if="status === 2" class="text-uppercase text-center font1-5em text-light text-bold">
          Negar acceso a pista
        </div>
        <div v-if="status === 3" class="text-uppercase text-center font1-5em text-light text-bold">
          Acceso limitado a Áreas Comúnes
        </div>
        <div v-if="status === 1" class="text-uppercase text-center font1-5em text-light text-bold flex align-center justify-center">
          <Flag v-if="info.type === 'SUCCESS' && !rawDate" :w="30" :h="30" class="pr-10"/>
          Nivel: {{ info.data.data.level }}
        </div>
        <div class="flex align-center flex-wrap">
          <div class="flex-grow-1">
            <Stop v-if="info.type === 'ERROR'" :w="30" :h="30"/>
            <Flag v-if="status === 1 && rawDate" :w="30" :h="30"/>
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
  import { computed } from 'vue'
  import { DateTime } from "luxon";

  const props = defineProps({
    info: {
      type: Object,
      required: true
    },
  })

  const rawDate = props.info.data.data?.last_income_record?.date;
  const formattedDate = rawDate ? DateTime.fromFormat(rawDate, 'yyyy-LL-dd HH:mm:ss').toFormat("dd/MMM/yy h:mm a") : ''

  const status = computed(() => {
    return props.info.data.data.status
  })

  const notFound = computed(() => {
    return ['Piloto no encontrado.', 'Acceso no encontrado.'].includes(props.info.data.message)
  })

  const backgroundColor = computed(() => {
    const status = props.info.data?.data?.status
    const isRegisterGuestSuccess = props.info.type === 'REGISTER_GUEST_SUCCESS'

    if (status === 1 || isRegisterGuestSuccess) {
      return 'back-success'
    }
    if (status === 2) {
      return 'back-error'
    }
    if (status === 3) {
      return 'back-blue'
    }
    
    return 'back-error'
  })


</script>

<style>
.race-image{
  max-width: 100%;
  height: auto;
  max-height: 380px
}
</style>
