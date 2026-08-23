<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token') // Hapus token
  router.push('/login') // Lempar kembali ke login
}
</script>

<template>
  <main>
    <!-- Tampilkan Navbar hanya jika pengguna sudah login -->
    <nav v-if="$route.path !== '/login'" style="padding: 10px; background: #f4f4f4; margin-bottom: 20px;">
      <router-link to="/tickets" style="margin-right: 10px;">Daftar Tiket</router-link>
      <button @click="handleLogout">Logout</button>
    </nav>

    <!-- Router View merender LoginView atau TicketListView sesuai rute -->
    <router-view />
  </main>
</template>