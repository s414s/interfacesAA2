import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
      component: () => import('../views/HotelsView.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserDetailsView.vue')
      // component: UserDetailsView,
    },
    {
      path: '/bookings/:idHotel',
      name: 'bookings',
      component: () => import('../views/BookingsView.vue')
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('../views/BookingsView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    }
  ]
});

export default router;