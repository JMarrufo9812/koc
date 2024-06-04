<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <div class="flex justify-center py-20">
            <div style="width: 80%;">
              <div class="flex justify-center">
                <div
                  class="back-error flex justify-center align-center rounded"
                  style="width: 75px; height: 75px"
                >
                  <span
                    class="ion-close-round text-white"
                    style="font-size: 45px"
                  ></span>
                </div>
              </div>
              <p class="font1-5em text-center mt-20 text-bold text-uppercase">
                ¡Error!
              </p>
              <p v-for="message in appStore.modalError.messages" class="font1-5em text-center">
                {{ message }}
              </p>
              <Button
                class="py-20"  
                @click="appStore.handleModalError({ show: false, messages: null })" 
                :text="'Entendido'" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";

import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

</script>
