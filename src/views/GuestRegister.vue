<template>
  <div class="flex justify-center">
    <div class="container">
      <p class="font2em text-uppercase my-20 text-primary text-bold">
        Registro invitado
      </p>
      <div v-if="step === 1">
        <FieldText 
          class="pt-20" 
          :label="'Persona que visita'" 
          :classLabel="'text-primary font1-5em text-bold'"
        />
        <FieldText
          class="pt-20" 
          :label="'Membresia'" 
          :classLabel="'text-primary font1-5em text-bold'" 
        />
        <Button
          class="pt-20" 
          :text="'Continuar'" 
          @click="step = 2" 
        />
      </div>
      <div v-if="step === 2">
        <FieldText 
          class="pt-20" 
          :label="'Nombre completo'" 
          :classLabel="'text-primary font1-5em text-bold'"
        />
        <div class="flex font1-5em">
          <div>
            <p>Foto identificación</p>
            <p @click="step = 'CAM'" class="text-pointer text-blue">
              Cargar foto
            </p>
          </div>
        </div>
        <div class="flex font1-5em">
          <div>
            <p>Foto invitado</p>
            <p @click="step = 'CAM'" class="text-pointer text-blue">
              Cargar foto
            </p>
          </div>
        </div>
        <Button
          class="pt-20" 
          :text="'Registrar'" 
          @click="step = 1" 
        />
      </div>
      <div v-show="step === 'CAM'">
        <CamPhoto />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import FieldText from "@/components/ui/fields/FieldText.vue";
import Button from "@/components/ui/Button.vue";
import CamPhoto from '@/components/app/CamPhoto.vue';

const step = ref(1)

</script>