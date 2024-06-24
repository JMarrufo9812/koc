import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Camera from "simple-vue-camera";

const app = createApp(App)

app.component('Camera', Camera);

app.use(router)
app.use(createPinia())

app.mount('#app')
