<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTicketStore } from '@/stores/ticketStore';

const ticketStore = useTicketStore();
// Reaktivitas terjaga dengan storeToRefs
const { tickets, isLoading } = storeToRefs(ticketStore);
const { fetchTickets } = ticketStore;

onMounted(() => {
  fetchTickets();
});

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
  <div style="padding: 24px; font-family: system-ui, sans-serif; max-width: 640px; margin: 0 auto;">
    <h2 style="border-bottom: 2px solid #eee; padding-bottom: 8px;">Daftar Tiket Pertandingan</h2>

    <!-- State 1: Loading -->
    <div v-if="isLoading" style="text-align: center; padding: 20px;">
      <p>⏳ Memuat data tiket...</p>
    </div>

    <!-- State 2: Data Ada -->
    <div v-else-if="tickets.length > 0">
      <div 
        v-for="ticket in tickets" 
        :key="ticket.id"
        style="border: 1px solid #e0e0e0; padding: 16px; margin-bottom: 12px; border-radius: 8px; background: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.05);"
      >
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="margin: 0; color: #1a0dab;">{{ ticket.eventName }}</h3>
          <span style="background: #e6f4ea; color: #137333; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">
            {{ ticket.status }}
          </span>
        </div>

        <p style="margin: 4px 0;"><strong>Kode Tiket:</strong> <code>{{ ticket.ticketCode }}</code></p>
        <p style="margin: 4px 0;"><strong>Jadwal:</strong> {{ formatDate(ticket.matchDate) }}</p>
        <p style="margin: 4px 0;"><strong>Lokasi:</strong> {{ ticket.stadiumName }} ({{ ticket.standName }} - Kursi {{ ticket.seatNumber }})</p>
        <p style="margin: 4px 0;"><strong>Akses Gate:</strong> {{ ticket.gate }}</p>
        <p style="margin: 4px 0;"><strong>Harga:</strong> <span style="color: #d93025; font-weight: bold;">{{ formatRupiah(ticket.price) }}</span></p>
      </div>
    </div>

    <!-- State 3: Data Kosong -->
    <div v-else style="background: #fff3cd; color: #856404; padding: 12px; border-radius: 6px;">
      <p style="margin: 0;">⚠️ Belum ada tiket yang tersedia.</p>
    </div>
  </div>
</template>