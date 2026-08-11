import AuthLayout from '@/layouts/AuthLayout.vue';
import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'auth' }
    },

    {
      path: '/auth',
      name: 'auth',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'login',
          component: LoginView,
        }
      ]

    }
  ],
});

export default router;
