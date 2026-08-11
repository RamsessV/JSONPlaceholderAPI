import { getUsersAction } from '@/actions';
import type { User } from '@/types';
import { ref } from 'vue';

const _users = ref<User[]>([]);
const users = ref<User[]>([]);
const loaded = ref(false);
const error = ref(false);

export const useUsers = () => {
  if (!loaded.value) {
    fetchUsers();
  }

  return {
    users,
    error,
    setPage,
    retry: fetchUsers
  };
};

async function fetchUsers() {
  error.value = false;

  const response = await getUsersAction();

  if (!response.ok) {
    error.value = true;
    return;
  }

  if (!response.users) {
    error.value = true;
    return;
  }

  _users.value = response.users;
  setPage(1);
  loaded.value = true;
}

// Mostrar de 4 en 4
function setPage(page: number) {
  const start = 4 * (page - 1);
  users.value = _users.value.slice(start, start + 4);
}
