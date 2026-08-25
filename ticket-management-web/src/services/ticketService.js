import axios from 'axios';

const API_BASE_URL = 'import.meta.env.VITE_TICKETING_API_URL';

// Helper function untuk mengambil header Authorization (JWT Token)
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
};

export default {
  // GET: Fetch semua tiket
  getAllTickets() {
    return axios.get(`${API_BASE_URL}/tickets`, {
      headers: getAuthHeader()
    });
  },

  // POST: Buat tiket baru ke Spring Boot
  createTicket(ticketPayload) {
    return axios.post(`${API_BASE_URL}/tickets`, ticketPayload, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      }
    });
  }
};