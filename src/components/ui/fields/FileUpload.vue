<template>
  <div>
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Suelta aqui los archivos para subir</h3>
    </div>
    <file-upload
      :post-action="postAction"
      :accept="accept"
      :multiple="true"
      :size="size || 0"
      :drop="true"
      :drop-directory="true"
      v-model="files"
      ref="upload"
      style="width: 100%; height: 20vh"
      class="back-white"
    >
      <div class="flex align-center justify-center" style="height: 100%">
        <div>
          <AddImage />
          <p class="font1-5em">Arrastra imágenes para subir</p>
        </div>
      </div>
    </file-upload>
    <section class="upload">
      <div
        class="back-white margin-bottom15"
        v-for="file in files"
        :key="file.id"
      >
        <article class="padding10">
          <div class="flex margin-bottom10 width100">
            <figure class="margin-right10">
              <img
                v-if="file.thumb"
                :src="file.thumb"
                class="width100"
                height="auto"
              />
              <span v-else>No Imagen</span>
            </figure>
            <div class="width-100">
              <p class="font1-3em margin-bottom10">
                {{ file.name }}
              </p>
              <div
                class="flex align-center"
                v-if="file.active || file.progress !== '0.00'"
              >
                <div
                  class="back-white flex align-center margin-bottom5"
                  style="
                    border-radius: 3px;
                    box-shadow: 0 0 2px lightgray;
                    width: 60%;
                  "
                >
                  <div
                    class="flex back-red flex-right align-center"
                    :style="{ width: file.progress + '%' }"
                    :class=" {
                      'back-yellow-percent': file.progress > 60 && file.progress < 81,
                      'back-green-percent': file.progress == 100,
                    }"
                    style="
                      height: 25px;
                      border-radius: 3px;
                      transition: all ease 1.9s;
                    "
                  ></div>
                </div>
                <p
                  class="color-darkblue font-bold relative"
                  style="top: -3px; right: -9px"
                >
                  {{ file.progress }}%
                </p>
              </div>
              <p class="font1em color-darkblue margin-bottom10">
                size: {{ file.size / 1000 }} Kb.
              </p>
            </div>
          </div>
          <div class="flex align-center" v-if="!file.success">
            <button
              class="my-btn widthHalf back-blue margin-right10"
              v-if="file.active"
              @click.prevent="$refs.upload.update(file, { active: false })"
            >
              <h2 class="font1-3em color-white">
                Cancelar
              </h2>
            </button>

            <button
              v-else-if="
                file.error &&
                file.error !== 'compressing' &&
                $refs.upload.features.html5
              "
              class="my-btn widthHalf back-blue margin-right10"
              @click.prevent="onRetry(file)"
            >
              <h2 class="font1-3em color-white">
                <span class="ion-upload"></span>
                Volver a intentar
              </h2>
            </button>

            <button
              v-else
              class="my-btn widthHalf back-blue margin-right10"
              @click.prevent="
                file.success || file.error === 'compressing'
                  ? false
                  : $refs.upload.update(file, { active: true })
              "
            >
              <h2 class="font1-3em color-white">
                <span class="ion-upload"></span>
                Subir
              </h2>
            </button>

            <button
              class="my-btn widthHalf back-yellow"
              @click.prevent="$refs.upload.remove(file)"
            >
              <h2 class="font1-3em color-white">
                <span class="ion-close"></span>Quitar
              </h2>
            </button>
          </div>

          <div v-else class="back-green padding15 align-center justify-center">
            <p class="font1-5em color-white">
              charge_massive_images.uploaded_image
              <span
                class="font1em ion-checkmark-circled relative"
                style="top: 2px"
              ></span>
            </p>
          </div>
        </article>

        <div class="back-red padding10" v-if="file.error">
          <h3 class="color-white font1-5em">Error:</h3>
          <p v-html="file.error" class="color-white font1em"></p>
        </div>
      </div>
    </section>
    <!-- @input-filter="inputFilter"
    @input-file="inputFile" -->
  </div>
</template>

<script setup>
import FileUpload from "vue-upload-component";
import AddImage from "@/assets/icons/AddImage.vue";

import { ref } from "vue";

const postAction = `apiUrl/admin/product-massive-images`;
const extensions = "jpg,jpeg,png";
const accept = "image/png,image/jpg,image/jpeg";
const size = 1024 * 1024 * 5;
const thread = 3;
const headersImg = {
  Authorization: "Bearer " + localStorage.tokenOAGV,
  "X-Requested-With": "XMLHttpRequest",
  // 'Accept': 'application/json',
  // 'Content-Type': 'multipart/form-data'
};
const files = ref([]);
</script>
