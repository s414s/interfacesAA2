import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/userStore';
// import UserDetailsView from '../views/UserDetailsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/hotels',
      name: 'hotels',
      meta: { requiresAuth: false },
      component: () => import('../views/HotelsView.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta: { requiresAuth: true },
      component: () => import('../views/UserDetailsView.vue')
      // component: UserDetailsView,
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
      meta: { requiresAuth: true },
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
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const { isAuthed } = useUserStore();

  if (to.meta.requiresAuth && !isAuthed) return '/login';
});

export default router;