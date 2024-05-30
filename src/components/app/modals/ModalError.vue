<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <div class="flex justify-center">
            <div>
              <div
                class="back-error flex justify-center align-center rounded"
                style="width: 75px; height: 75px"
              >
                <span
                  class="ion-close-round text-white"
                  style="font-size: 45px"
                ></span>
              </div>
              <p class="font1-5em text-center mt-10 text-bold">
                Error
              </p>
              <p class="font1em text-center mt-10 text-bold">
                {{ appStore.modalError.msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import  { useAppStore } from '@/store/app'

const appStore = useAppStore()

</script>
