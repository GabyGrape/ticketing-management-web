<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const handleLogout = () => {
  localStorage.removeItem('token') // Hapus token
  router.push('/login') // Lempar kembali ke login
}
</script>

<template>
  <!-- 1. Kondisi jika di halaman Login: Tampilkan router-view saja (Full Screen) -->
  <template v-if="route.path === '/login'">
    <router-view />
  </template>

  <!-- 2. Kondisi jika sudah Login: Layout Sidebar (Kiri) + Main Content (Kanan) -->
  <div v-else class="flex min-h-screen bg-white text-zinc-900 font-sans">
    
    <!-- Sidebar Navigation -->
    <aside class="w-64 border-r border-zinc-200 bg-white flex flex-col justify-between p-4 shrink-0">
      <div class="space-y-6">
        <!-- Logo / Brand Title -->
        <div class="px-3 py-2 flex items-center gap-2 border-b border-zinc-100 pb-4">
          <div class="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm">
            T
          </div>
          <span class="font-bold text-lg text-zinc-900 tracking-tight">TicketingApp</span>
        </div>

        <!-- Navigation Links -->
        <nav class="space-y-1">
          <!-- Router Link Tiket -->
          <router-link
            to="/tickets"
            v-slot="{ isActive }"
          >
            <div
              :class="[
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer',
                isActive
                  ? 'bg-zinc-700 text-white shadow-sm'
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
              ]"
            >
              <!-- <span class="text-base"></span> -->
              <span>Daftar Tiket</span>
            </div>
          </router-link>

          <!-- Kamu bisa tambah router-link lain di sini nanti -->
        </nav>
      </div>

      <!-- Bottom Sidebar: Tombol Logout -->
      <div class="border-t border-zinc-100 pt-4">
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <!-- <span class="text-base">🚪</span> -->
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content (Area Kerja Halaman Aktif) -->
    <main class="flex-1 bg-white p-6 md:p-10 overflow-y-auto">
      <router-view class="w-full "/>
    </main>

  </div>
</template>