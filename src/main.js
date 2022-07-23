import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router/index.js'
import VueCookies from 'vue-cookies'

createApp(App).use(router,axios,VueCookies).mount('#app')