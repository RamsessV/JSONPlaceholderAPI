import { getUsersAction } from '@/actions';
import type { User } from '@/types';
import { computed, ref } from 'vue';

const page = ref(1);
const _users = ref<User[]>([]);

const filteredUsers = computed(() => {
  return _users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchName.value.toLowerCase()) &&
      user.company.toLowerCase().includes(searchCompany.value.toLowerCase()),
  );
});

const users = computed(() => {
  const start = (page.value - 1) * 4;

  return filteredUsers.value.slice(start, start + 4);
});

const searchName = ref('');
const searchCompany = ref('');
const loading = ref(false);
const loaded = ref(false);
const error = ref(false);

export const useUsers = () => {
  if (!loaded.value) {
    fetchUsers();
  }

  function nextPage() {
    page.value++;
  }
  function previousPage() {
    page.value--;
  }

  return {
    users,
    error,
    page,
    lastPage: computed(() => users.value.length < 3),
    loading,
    searchName,
    searchCompany,
    nextPage,
    previousPage,
    retry: fetchUsers,
  };
};

async function fetchUsers() {
  error.value = false;
  loading.value = true;

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
  loaded.value = true;
  loading.value = false;
}
