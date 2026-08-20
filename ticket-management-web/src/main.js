// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import App from './App.vue'
// import router from './router'

// createApp(App).mount('#app')

// app.use(createPinia()) // Mengaktifkan Pinia Store
// app.use(router)        // Mengaktifkan Vue Router

// app.mount('#app')
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App) // ✅ Simpan ke variabel app dulu

app.use(createPinia())    // ✅ Pasang Pinia
app.use(router)           // ✅ Pasang Router

app.mount('#app')         // ✅ Baru mount ke HTML