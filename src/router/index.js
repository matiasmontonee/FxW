import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginView.vue';
import Requests from '../views/RequestsView.vue';
import CreateDocument from '../views/CreateDocumentView.vue';
import Download from '../views/DownloadView.vue';
import Dashboard from '../views/DashboardView.vue';
import Contact from '../views/ContactView.vue';
import Settings from '../views/SettingsView.vue';
import Help from '../views/HelpView.vue';
import NotFound from '../views/NotFoundView.vue'; 

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/requests',
    component: Requests,
    meta: { requiresAuth: true }
  },
  {
    path: '/download',
    component: Download,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    component: Contact,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    component: Help,
    meta: { requiresAuth: true }
  },
  {
    path: '/newdocument',
    component: CreateDocument,
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)', 
    component: NotFound 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user'); // Comprueba si el usuario está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Si no está autenticado, redirige al inicio de sesión
  } else {
    next(); // Si está autenticado o la ruta no requiere autenticación, continúa normalmente
  }
});

export default router;