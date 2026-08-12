import { isAuthenticatedAction } from '@/actions';
import AuthLayout from '@/layouts/AuthLayout.vue';
import LoginView from '@/views/LoginView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/admin',
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
        },
      ],
    },

    {
      path: '/admin',
      name: 'admin',
      meta: {
        requiresAuth: true,
      },
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'users',
          component: () => import('@/views/AdminView.vue')
        }
      ]
    },
  ],
});

router.beforeEach((to) => {
  const isAuth = isAuthenticatedAction()

  if (to.meta.requiresAuth && !isAuth) {
    return { name: 'login' }
  }

  if (to.name === 'login' && isAuth) {
    return { name: 'admin' }
  }

  return true
})

export default router;
