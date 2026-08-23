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
    // 1. Kirim request POST ke endpoint backend
    const response = await axios.post(
      'http://127.0.0.1:8080/api/auth/login', 
      {
        username: username.value.trim(),
        password: password.value.trim()
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000 // Batas waktu request 5 detik
      }
    )

    // 2. Ambil token dari response
    const token = response.data.token
    if (!token) {
      throw new Error('Response server tidak mengandung token.')
    }

    // 3. Format token dan simpan ke localStorage
    const fullToken = `Bearer ${token}`
    localStorage.setItem('token', fullToken)

    // 4. Set default Header Authorization Axios
    axios.defaults.headers.common['Authorization'] = fullToken

    // 5. Hard-redirect langsung ke halaman tiket
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
  <div style="max-width: 300px; margin: 50px auto; text-align: center;">
    <h2>Silakan Login</h2>
    
    <!-- Tampilkan pesan error jika ada -->
    <p v-if="errorMessage" style="color: red; margin-bottom: 10px;">
      {{ errorMessage }}
    </p>

    <form @submit.prevent="handleLogin">
      <div style="margin-bottom: 10px;">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Username" 
          :disabled="isLoading"
          required 
        />
      </div>
      <div style="margin-bottom: 10px;">
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          :disabled="isLoading"
          required 
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Memproses...' : 'Login' }}
      </button>
    </form>
  </div>
</template>