import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import LottieAnimation from 'lottie-web-vue'

createApp(App)
  .use(createPinia())
  .use(LottieAnimation)
  .use(router)
  .mount('#oxyframe-style-manager')
