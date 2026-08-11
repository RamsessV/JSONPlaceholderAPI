import { getUsersAction } from '@/actions';
import type { User } from '@/types';
import { ref } from 'vue';

const _users = ref<User[]>([]);
const users = ref<User[]>([]);
const loaded = ref(false);

export const useUsers = () => {
  if (!loaded.value) {
    fetchUsers();
  }

  return {
      users,
    };
};

async function fetchUsers() {
  const response = await getUsersAction();
  if (!response.ok) {
    return;
  }

  if (!response.users) {
    return;
  }

  users.value = response.users;
  _users.value = response.users;
  loaded.value = true;
}
