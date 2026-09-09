// import { createRouter, createWebHistory } from 'vue-router'
// import TicketListView from '@/views/TicketListView.vue'
// import LoginView from '@/views/LoginView.vue'

// // 1. Definisi Rute
// const routes = [
//   {
//     path: '/tickets',
//     name: 'tickets',
//     component: TicketListView,
//     meta: { requiresAuth: true }
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: LoginView,
//     meta: { requiresGuest: true }
//   },
//   {
//     path: '/',
//     redirect: '/login'
//   }
// ]

// // 2. Inisialisasi Router (Cukup dipanggil SATU kali)
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // 3. Navigation Guard (Pencegat Akses)
// router.beforeEach((to, from) => {
//   const isAuthenticated = !!localStorage.getItem('token')

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return{ name: 'login' }
//   } else if (to.meta.requiresGuest && isAuthenticated) {
//     return{ name: 'tickets' }
//   }

//   return true
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router'
import TicketListView from '@/views/TicketListView.vue'
import LoginView from '@/views/LoginView.vue'

// 1. Definisi Rute
const routes = [
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketListView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    redirect: '/login'
  }
]

// 2. Inisialisasi Router
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 3. Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  } 
  
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'tickets' })
  }

  next() // Lanjutkan navigasi normal jika kondisi aman
})

export default router