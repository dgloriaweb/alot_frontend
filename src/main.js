import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

app.config.globalProperties.$appName = 'ALOT Community Hub'
app.config.globalProperties.$apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

const authStore = useAuthStore(pinia)
authStore.loadUser()

app.mount('#app')

