import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/userStore';
// import UserDetailsView from '../views/UserDetailsView.vue';

// TODO - leer
// https://router.vuejs.org/guide/advanced/meta.html

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
      // children: [
      //   {
      //     path: ':idHotel',
      //     name: 'hotelrooms',
      //     component: () => import('../views/RoomsView.vue'),
      //   }
      // ]
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
      meta: { requiresAuth: true, requiresRole: "Admin" },
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
  // the router starts its navigation after the router is installed and pinia will be installed too
  const { isAuthed } = useUserStore();

  if (to.meta.requiresAuth && !isAuthed) return '/login';

  if (to.name === 'login' && isAuthed) return '/';
});

export default router;