import type { NavigationGuard } from "vue-router";

export const isAuthenticatedAction = () => {
    const token = getToken();
    return !!token;
}

const getToken = () => {
  const cookie = document.cookie.split('; ').find(row => row.startsWith('token='))

  return cookie?.split('=')[1];
}