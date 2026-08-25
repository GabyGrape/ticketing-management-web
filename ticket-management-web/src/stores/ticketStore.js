import { defineStore } from 'pinia';
import { ref } from 'vue';
import ticketService from '@/services/ticketService';

export const useTicketStore = defineStore('ticket', () => {
  const tickets = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref(null);

  // Action GET Tickets
  async function fetchTickets() {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      const response = await ticketService.getAllTickets();
      
      if (response.data && Array.isArray(response.data.content)) {
        tickets.value = response.data.content;
      } else if (Array.isArray(response.data)) {
        tickets.value = response.data;
      } else {
        tickets.value = [];
      }
    } catch (error) {
      console.error("Gagal mengambil data tiket:", error);
      errorMessage.value = error.response?.data?.message || 'Gagal terhubung ke server.';
      tickets.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  // Action CREATE Ticket
  async function addTicket(newTicketData) {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      const response = await ticketService.createTicket(newTicketData);
      
      // Ambil objek response dari backend
      const createdTicket = response.data;
      
      // Masukkan ke urutan pertama array lokal (O(1) complexity)
      tickets.value.unshift(createdTicket);
      
      return { success: true };
    } catch (error) {
      console.error("Gagal menambahkan tiket:", error);
      const msg = error.response?.data?.message || 'Gagal membuat tiket baru.';
      errorMessage.value = msg;
      return { success: false, message: msg };
    } finally {
      isLoading.value = false;
    }
  }

  return { tickets, isLoading, errorMessage, fetchTickets, addTicket };
});