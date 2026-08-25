<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTicketStore } from '@/stores/ticketStore';

const ticketStore = useTicketStore();
const { tickets, isLoading, errorMessage } = storeToRefs(ticketStore);
const { fetchTickets, addTicket } = ticketStore;

// State Modal & Form Input
const isModalOpen = ref(false);
const isSubmitting = ref(false);

const form = ref({
  ticketCode: '',
  eventName: '',
  stadiumName: '',
  standName: '',
  gate: '',
  seatNumber: '',
  price: 0,
  matchDate: '',
  status: 'AVAILABLE'
});

onMounted(() => {
  fetchTickets();
});

// Reset Form Function
const resetForm = () => {
  form.value = {
    ticketCode: '',
    eventName: '',
    stadiumName: '',
    standName: '',
    gate: '',
    seatNumber: '',
    price: 0,
    matchDate: '',
    status: 'AVAILABLE'
  };
};

// Handle Submit Form
const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Payload disesuaikan dengan skema JSON Spring Boot
  const payload = {
    ...form.value,
    price: Number(form.value.price)
  };

  const result = await addTicket(payload);
  isSubmitting.value = false;

  if (result.success) {
    isModalOpen.value = false;
    resetForm();
  }
};

// Format Angka ke Rupiah
const formatRupiah = (val) => {
  if (val === undefined || val === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
};

// Format ISO Date ke Format Lokal
const formatDate = (isoString) => {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'short'
  });
};
</script>

<template>
  <div class="w-full space-y-6">  
    <!-- Top Header & Action Button -->
    <div class="px-5 py-4 border-b-2 border-zinc-200 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-zinc-900">
        Daftar Tiket Pertandingan
      </h2>
      <button 
        @click="isModalOpen = true"
        class="bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
      >
        + Buat Tiket
      </button>
    </div>

    <!-- Error Alert Banner -->
    <div v-if="errorMessage" class="mx-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
      {{ errorMessage }}
    </div>

    <!-- State 1: Loading -->
    <div v-if="isLoading && tickets.length === 0" class="text-center p-5">
      <p class="text-zinc-600">⏳ Memuat data tiket...</p>
    </div>

    <!-- State 2: Data Ada -->
    <div v-else-if="tickets.length > 0" class="space-y-3 px-5">
      <div 
        v-for="ticket in tickets" 
        :key="ticket.id"
        class="border border-zinc-200 p-4 rounded-lg bg-white shadow-sm"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="m-0 text-blue-700 font-bold text-lg">{{ ticket.eventName }}</h3>
          <span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-xs font-bold">
            {{ ticket.status }}
          </span>
        </div>

        <p class="my-1 text-sm text-zinc-700"><strong>Kode Tiket:</strong> <code class="px-1.5 py-0.5 bg-zinc-100 rounded text-xs font-mono">{{ ticket.ticketCode }}</code></p>
        <p class="my-1 text-sm text-zinc-700"><strong>Jadwal:</strong> {{ formatDate(ticket.matchDate) }}</p>
        <p class="my-1 text-sm text-zinc-700"><strong>Lokasi:</strong> {{ ticket.stadiumName }} ({{ ticket.standName }} - Kursi {{ ticket.seatNumber }})</p>
        <p class="my-1 text-sm text-zinc-700"><strong>Akses Gate:</strong> {{ ticket.gate }}</p>
        <p class="my-1 text-sm text-zinc-700"><strong>Harga:</strong> <span class="text-red-600 font-bold">{{ formatRupiah(ticket.price) }}</span></p>
      </div>
    </div>

    <!-- State 3: Data Kosong -->
    <div v-else class="mx-5 bg-amber-100 text-amber-800 p-3 rounded-md">
      <p class="m-0 text-sm">⚠️ Belum ada tiket yang tersedia.</p>
    </div>

    <!-- Modal Form Create Ticket -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-zinc-200">
        <div class="flex justify-between items-center border-b pb-3">
          <h3 class="text-lg font-bold text-zinc-900">Tambah Tiket Baru</h3>
          <button @click="isModalOpen = false" class="text-zinc-400 hover:text-zinc-700 font-bold">✕</button>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-3 text-xs">
          <div>
            <label class="block font-semibold text-zinc-700 mb-1">Kode Tiket</label>
            <input v-model="form.ticketCode" required placeholder="TKT-2026-003" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
          </div>

          <div>
            <label class="block font-semibold text-zinc-700 mb-1">Nama Event / Pertandingan</label>
            <input v-model="form.eventName" required placeholder="Persib vs Persija" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Nama Stadion</label>
              <input v-model="form.stadiumName" required placeholder="GBLA" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Tribun / Stand</label>
              <input v-model="form.standName" required placeholder="Tribun Timur" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Akses Gate</label>
              <input v-model="form.gate" required placeholder="Gate 3" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Nomor Kursi</label>
              <input v-model="form.seatNumber" required placeholder="A-12" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Harga Tiket (IDR)</label>
              <input v-model.number="form.price" type="number" required placeholder="150000" class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
            <div>
              <label class="block font-semibold text-zinc-700 mb-1">Jadwal Pertandingan</label>
              <input v-model="form.matchDate" type="datetime-local" required class="w-full border border-zinc-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900" />
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-4 border-t border-zinc-100">
            <button type="button" @click="isModalOpen = false" class="px-4 py-2 border border-zinc-300 rounded-md hover:bg-zinc-100 text-zinc-700 font-medium">
              Batal
            </button>
            <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-800 font-medium disabled:bg-zinc-400">
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan Tiket' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>