import { defineStore } from 'pinia';
import { ref } from 'vue';
import ticketService from '@/services/ticketService';

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref([]);
  const isLoading = ref(false);

  async function fetchTickets() {
    isLoading.value = true;
    try {
      const response = await ticketService.getAllTickets();
      
      // Axios sudah otomatis parse JSON. Langsung ambil .content
      if (response.data && Array.isArray(response.data.content)) {
        tickets.value = response.data.content;
      } else if (Array.isArray(response.data)) {
        tickets.value = response.data;
      } else {
        tickets.value = [];
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memanggil backend:", error);
      tickets.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  return { tickets, isLoading, fetchTickets };
});