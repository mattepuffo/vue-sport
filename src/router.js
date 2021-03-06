import {createRouter, createWebHashHistory} from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Allenamenti from "@/components/Allenamenti";
import AggiungiAllenamento from "@/components/AggiungiAllenamento";
import Pesi from "@/components/Pesi";
import AggiungiPeso from '@/components/AggiungiPeso';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/allenamenti',
        name: 'allenamenti',
        component: Allenamenti,
    },
    {
        path: '/aggiungi/:id?/:dup?',
        name: 'aggiungi',
        component: AggiungiAllenamento,
    },
    {
        path: '/pesi',
        name: 'pesi',
        component: Pesi,
    },
    {
        path: '/aggiungi_peso',
        name: 'aggiungi_peso',
        component: AggiungiPeso,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
