import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/landing',
      name: 'landing',
      meta: { requiresAuth: false },
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: { requiresAuth: true },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: () => import('../views/HotelsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/hotels/:idHotel',
      name: 'hotelrooms',
      component: () => import('../views/RoomsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      meta: { requiresAuth: true },
      component: () => import('../views/UserDetailsView.vue')
    },
    {
      path: '/bookings/:idHotel',
      name: 'bookings',
      meta: { requiresAuth: true },
      component: () => import('../views/BookingsView.vue')
    },
    {
      path: '/bookings',
      name: 'bookings',
      meta: { requiresAuth: true },
      component: () => import('../views/BookingsView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { requiresRole: "Admin" },
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: () => import('../views/LoginView.vue'),
    }
  ]
});

router.beforeEach((to) => {
  const { isAuthed, isAdmin } = useUserStore();

  if (to.name === 'login' && isAuthed) return '/';

  if (to.meta.requiresRole === "Admin" && !isAdmin) return '/home';
  if (to.meta.requiresAuth && !isAuthed) return '/landing';
});

export default router;