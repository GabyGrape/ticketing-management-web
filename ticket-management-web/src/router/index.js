import { createRouter, createWebHistory } from 'vue-router';
import TicketListView from '@/views/TicketListView.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [ // ✅ Tambahkan huruf 's'
        {
            path: '/tickets',
            name: 'tickets',
            component: TicketListView
        }
    ]
});

export default router;