import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueBasicAlert from 'vue-basic-alert'


createApp(App).use(router).use(VueBasicAlert).mount('#app')
