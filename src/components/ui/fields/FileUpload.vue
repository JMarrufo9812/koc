<template>
  <div>
    <Button>
      <template #button-content>
        <label for="file">
          <h2 class="font1-5em text-white margin-y-none">
            <span class="ion-plus"></span>
            Agregar imagenes
          </h2>
        </label>
      </template>
    </Button>
    <div class="flex flex-wrap my-10">
      <div class="pr-5 flex-grow-1">
        <Button
          v-if="!$refs.upload || !$refs.upload.active"
          @click.prevent="$refs.upload.active = true"
          :text="'Subir todo'"
          :color="'blue'"
        >
        </Button>
      </div>
      <div class="pl-5 flex-grow-1">
        <Button @click="deleteAll" :text="'Borrar todo'" :color="'error'"> </Button>
      </div>
    </div>
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Suelta aqui los archivos para subir</h3>
    </div>
    <file-upload
      v-model="files"
      :post-action="postAction"
      :accept="accept"
      :multiple="true"
      :size="size || 0"
      :drop="true"
      :drop-directory="true"
      :data="credentials"
      :extensions="extensions"
      ref="upload"
      style="width: 100%; height: 20vh"
      class="back-white"
      @input-filter="inputFilter"
    >
      <div class="flex align-center justify-center" style="height: 100%">
        <div>
          <AddImage />
          <p class="font1-5em">Arrastra imágenes para subir</p>
        </div>
      </div>
    </file-upload>
    <section class="upload">
      <div class="back-white my-10" v-for="file in files" :key="file.id">
        <article class="padding10">
          <div class="flex margin-bottom10 width100">
            <figure class="mr-10">
              <img
                v-if="file.thumb"
                :src="file.thumb"
                class="width100"
                height="100"
              />
              <span v-else>No Imagen</span>
            </figure>
            <div class="width100">
              <p class="font1-5em">
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
                    class="flex back-error flex-right align-center"
                    :style="{ width: file.progress + '%' }"
                    :class="{
                      'back-warning': file.progress > 60 && file.progress < 81,
                      'back-success': file.progress == 100,
                    }"
                    style="
                      height: 25px;
                      border-radius: 3px;
                      transition: all ease 1.9s;
                    "
                  ></div>
                </div>
                <p
                  class="text-blue text-bold relative"
                  style="top: -3px; right: -9px"
                >
                  {{ file.progress }}%
                </p>
              </div>
              <p class="font1-5em">Tamaño: {{ file.size / 1000 }} Kb.</p>
            </div>
          </div>
          <div class="flex align-center" v-if="!file.success">
            <Button
              v-if="file.active"
              class="widht100"
              @click.prevent="$refs.upload.update(file, { active: false })"
              :color="'error'"
            >
              <template #button-content>
                <h2 class="font1-5em text-white margin-y-none">Cancelar</h2>
              </template>
            </Button>

            <Button
              v-else-if="
                file.error &&
                file.error !== 'compressing' &&
                $refs.upload.features.html5
              "
              class="widht100"
              @click.prevent="[
                $refs.upload.update(file, {
                  active: true,
                  error: '',
                  progress: '0.00',
                  data: credentials
                }),
              ]
              "
              :color="'blue'"
            >
              <template #button-content>
                <h2 class="font1-5em text-white margin-y-none">
                  <span class="ion-upload"></span>
                  Volver a intentar
                </h2>
              </template>
            </Button>

            <Button
              v-else
              class="widht100"
              @click.prevent="
                file.success || file.error === 'compressing'
                  ? false
                  : $refs.upload.update(file, { active: true })
              "
              :color="'blue'"
            >
              <template #button-content>
                <h2 class="font1-5em text-white margin-y-none">
                  <span class="ion-upload"></span>
                  Subir
                </h2>
              </template>
            </Button>

            <Button
              class="widht100"
              :color="'warning'"
              @click.prevent="$refs.upload.remove(file)"
            >
              <template #button-content>
                <h2 class="font1-5em text-white margin-y-none">
                  <span class="ion-close"></span>
                  Quitar
                </h2>
              </template>
            </Button>
          </div>

          <div v-else class="back-success p-10 align-center justify-center">
            <span class="font1-5em text-white">
              Imagen cargada
              <span
                class="font1em ion-checkmark-circled relative"
                style="top: 2px"
              ></span>
            </span>
          </div>
        </article>

        <div
          v-if="file.error"
          class="flex text-white back-error p-10 padding10"
        >
          <span class="font1-5em pr-5">Error: </span>
          <div class="color-white font1-5em">
            {{ file.response.message }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import FileUpload from "vue-upload-component";
import AddImage from "@/assets/icons/AddImage.vue";
import Button from "@/components/ui/Button.vue";

import ServerDirections from "@/config/server-directions";

import { ref } from "vue";

const postAction = ServerDirections.PILOTS_STORAGE_IMAGES;
const extensions = "jpg,jpeg,png";
const accept = "image/png,image/jpg,image/jpeg";
const size = 1024 * 1024 * 5;

const files = ref([]);

const props = defineProps({
  credentials: {
    type: Object,
    default: {}
  },
});

const upload = ref(null)

function deleteAll(){
  files.value.forEach(file => {
    upload.value.remove(file)
  })
}

function inputFilter(newFile, oldFile, prevent) {
  if (newFile) {
    newFile.blob = "";
    let URL = window.URL || window.webkitURL;
    if (URL && URL.createObjectURL) {
      newFile.blob = URL.createObjectURL(newFile.file);
    }

    // Thumbnails
    newFile.thumb = "";
    if (newFile.blob && newFile.type.substr(0, 6) === "image/") {
      newFile.thumb = newFile.blob;
    }
  }
}
</script>
