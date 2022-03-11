import {createRouter, createWebHistory} from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Allenamenti from "@/components/Allenamenti";
import AggiungiAllenamento from "@/components/AggiungiAllenamento";

const routes = [
    {
        path: '/sport',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/sport/allenamenti',
        name: 'allenamenti',
        component: Allenamenti,
    },
    {
        path: '/sport/aggiungi/:id?',
        name: 'aggiungi',
        component: AggiungiAllenamento,
    }
];

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes
});

export default router;
