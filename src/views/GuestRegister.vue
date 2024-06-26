<template>
  <div v-if="step === 'ERROR' || step === 'SUCCESS'">
    <Result :info="resultInfo" ></Result>
  </div>  
  <div v-else="step !== 'ERROR' || step !== 'SUCCESS'" class="flex justify-center">
    <div class="container">
      <p class="font2em text-uppercase my-20 text-primary text-bold">
        Registro invitado
      </p>
      <div v-if="step === 1">
        <FieldText
          v-model="name" 
          class="pt-20" 
          :label="'Persona a la que visita'" 
          :classLabel="'text-primary font1-5em text-bold'"
          :cleareble="true"
        />
        <FieldText
          v-model="code"
          class="pt-20" 
          :label="'Membresia'" 
          :classLabel="'text-primary font1-5em text-bold'" 
          :cleareble="true"
        />
        <Button
          class="pt-20" 
          :text="'Continuar'"
          :disabled="disabledButtonStepOne" 
          @click="disabledButtonStepOne ? '' : visitValidate()" 
        />
      </div>
      <div v-if="step === 2">
        <FieldText
          v-model="visitName" 
          class="pt-20" 
          :label="'Nombre completo'" 
          :classLabel="'text-primary font1-5em text-bold'"
          :cleareble="true"
        />
        <div class="flex justify-between font1-5em my-20">
          <div>
            <p class="mt-0">Foto identificación</p>
            <p @click="step = 'CAM_IDE'" class="text-pointer text-blue">
              Cargar foto
            </p>
          </div>
          <div class="flex" style="width: 30%; max-height: 250px;">
            <img :src="imageIde.url" style="max-width: 100%; height: 100%;"><img>
          </div>
        </div>
        <div class="flex justify-between font1-5em my-20">
          <div>
            <p class="mt-0">Foto invitado</p>
            <p @click="step = 'CAM_GUEST'" class="text-pointer text-blue">
              Cargar foto
            </p>
          </div>
          <div class="flex" style="width: 30%; max-height: 250px;">
            <img :src="imagePerson.url" style="max-width: 100%; height: 100%;"><img>
          </div>
        </div>
        <Button
          class="pt-20" 
          :text="'Registrar'" 
          @click="disabledButtonStepTwo ? '' : guestCheckIn()"
          :disabled="disabledButtonStepTwo" 
        />
      </div>
      <div v-if="step === 'CAM_IDE' || step === 'CAM_GUEST'">
        <CamPhoto @charge="chargeImageHandler" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import FieldText from "@/components/ui/fields/FieldText.vue";
import Button from "@/components/ui/Button.vue";
import CamPhoto from '@/components/app/CamPhoto.vue';
import Result from '@/components/app/Result.vue';

import { AccessRequests } from "@/services/access.services";

const accessServices = new AccessRequests()

const step = ref(1)

// VISITS VALIDATE
const name = ref('')
const code = ref('')

const resultInfo = ref(null)

const disabledButtonStepOne = computed(() => {
  return !(!!name.value && !!code.value)
})

async function visitValidate() {
  accessServices.visitsValidate({ name: name.value, code: code.value })
    .then((data) => {
      resultInfo.value = data
      step.value = 2
    })
    .catch((err) => {
      resultInfo.value = {
        type: 'ERROR',
        code: code.value,
        data: err.response?.data || 'Unknown error'
      };

      step.value = 'ERROR'
    })
}


// VISITS CHEK IN
const imageIde = ref('')
const imagePerson = ref('')
const visitName = ref('')

const disabledButtonStepTwo = computed(() => {
  return !(!!imageIde.value && !!imagePerson.value && !!visitName.value)
})

function chargeImageHandler (imageData) {
  if (step.value === 'CAM_IDE') {
    imageIde.value = imageData
  }
  if (step.value === 'CAM_GUEST') {
    imagePerson.value = imageData
  }

  step.value = 2
}

function guestCheckIn () {
  const params = new FormData();
  
  params.append("pilot_name", name.value)
  params.append("pilot_code", code.value)
  params.append("pilot_status", resultInfo.value.data.data.status)
  params.append("visits_name", visitName.value)
  params.append("image_ide", imageIde.value.file)
  params.append("image_person", imagePerson.value.file)

  accessServices.visitAccessCheckin(params)

  resultInfo.value = {
    type: 'REGISTER_GUEST_SUCCESS',
    code: null,
    data: { code: code.value }
  };

  step.value = 'SUCCESS'
}

</script>