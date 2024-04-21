import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/userStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true },
      component: HomeView
    },
    {
      path: '/landing',
      name: 'landing',
      meta: { requiresAuth: false },
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/about',
      name: 'about',
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
      path: '/newbooking/:idRoom',
      name: 'newBooking',
      meta: { requiresAuth: true },
      component: () => import('../views/NewBookingView.vue'),
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
      component: () => import('../views/BookingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('../views/BookingsView.vue'),
      meta: { requiresAuth: true },
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