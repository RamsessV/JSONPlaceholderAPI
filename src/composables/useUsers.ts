import { getUsersAction } from '@/actions';
import type { User } from '@/types';
import { computed, ref, watch } from 'vue';

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
  function nextPage() {
    page.value++;
  }
  function previousPage() {
    page.value--;
  }

  watch([searchName, searchCompany], () => page.value = 1);

  return {
    users,
    error,
    page,
    lastPage: computed(() => users.value.length < 4),
    loading,
    searchName,
    searchCompany,
    nextPage,
    previousPage,
    fetchUsers,
    getUserById,
    addUser,
    updateUser,
  };
};

async function fetchUsers() {
  if (loaded.value) return;

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

function getUserById(id: number) {
  return users.value.find((user) => user.id === id);
}

function updateUser(user: User) {
  if (_users.value.some((u) => u.id !== user.id && u.email === user.email)) {
    return { ok: false, message: 'Este correo ya esta registrado' };
  }
  const index = _users.value.findIndex((u) => u.id === user.id);
  _users.value[index] = user;
  return { ok: true, message: 'Usuario actualizado con éxito' };
}

function addUser(name: string, email: string, company: string) {
  if (_users.value.some((u) => u.email === email)) {
    return { ok: false, message: 'Este correo ya esta registrado' };
  }
  const newUser = {
    id: _users.value.length > 0 ? Math.max(..._users.value.map((u) => u.id)) + 1 : 1,
    name,
    email,
    company,
  };
  _users.value.push(newUser);
  return { ok: true, message: 'Usuario registrado con éxito' };
}
