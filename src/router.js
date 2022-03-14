import {createRouter, createWebHistory} from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Allenamenti from "@/components/Allenamenti";
import AggiungiAllenamento from "@/components/AggiungiAllenamento";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
