<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await axios.post(
      'http://127.0.0.1:8080/api/auth/login', 
      {
        username: username.value.trim(),
        password: password.value.trim()
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      }
    )

    const token = response.data.token
    if (!token) {
      throw new Error('Response server tidak mengandung token.')
    }

    const fullToken = `Bearer ${token}`
    localStorage.setItem('token', fullToken)
    axios.defaults.headers.common['Authorization'] = fullToken

    window.location.href = '/tickets'

  } catch (error) {
    console.error('Login error:', error)

    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message
    } else {
      errorMessage.value = error.message || 'Gagal terhubung ke server. Periksa jaringan atau backend Anda.'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Container Utama: Center Vertikal & Horizontal (Full Screen) -->
  <div class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    
    <!-- Card Form Login -->
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
      
      <!-- Bagian Header Text (H1, H2, P) -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-extrabold text-blue-600 tracking-tight">Ticketing System</h1>
        <h2 class="text-xl font-bold text-gray-800 mt-1">Selamat Datang Kembali</h2>
        <p class="text-sm text-gray-500 mt-1">Silakan masukkan akun Anda untuk mengakses dashboard manajemen tiket.</p>
      </div>
      
      <!-- Pesan Error Alert -->
      <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200 text-center">
        {{ errorMessage }}
      </div>

      <!-- Form Login -->
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input 
            v-model="username" 
            type="text" 
            placeholder="Masukkan username Anda" 
            :disabled="isLoading"
            required 
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="••••••••" 
            :disabled="isLoading"
            required 
            class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-800 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100"
          />
        </div>

        <!-- Button Login -->
        <button 
          type="submit" 
          :disabled="isLoading" 
          class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {{ isLoading ? 'Memproses...' : 'Masuk ke Sistem' }}
        </button>
      </form>

      <!-- Bagian Footer Text di Bawah Button -->
      <div class="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-500 space-y-1">
        <p>Lupa password? Hubungi <span class="font-semibold text-blue-600">Administrator IT</span>.</p>
        <p class="text-gray-400">© 2026 OK Sys Management. All rights reserved.</p>
      </div>

    </div>
  </div>
</template>