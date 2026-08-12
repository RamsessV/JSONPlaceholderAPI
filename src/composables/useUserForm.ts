import { reactive, ref } from 'vue';
import { useUsers } from './useUsers';
import type { User } from '@/types';

interface Response {
  ok: boolean;
  message?: string;
}

const { getUserById, fetchUsers, addUser, updateUser } = useUsers();

export const useUserForm = () => {
  const user = reactive({
    name: '',
    email: '',
    company: '',
  });

  const id = ref<number | null>(null);

  async function setUser(userId: number) {
    await fetchUsers();
    const currentUser = getUserById(userId);

    if (currentUser) {
      user.name = currentUser.name;
      user.email = currentUser.email;
      user.company = currentUser.company;
      id.value = currentUser.id;
      return true;
    }
    return false;
  }

  function save(name: string, email: string, company: string): Response {
    const response = checkValues(name, email, company);
    if (!response.ok) {
      return response;
    }

    // Caso de edicion
    if (id.value !== null) {
      return updateUser({ id: id.value, name, email, company });
    } else {
      return addUser(name, email, company);
    }
  }

  return {
    user,
    setUser,
    save,
  };
};

function checkValues(name: string, email: string, company: string): Response {
  if ([name, email, company].some((field) => !field.trim())) {
    return { ok: false, message: 'Todos los campos son obligatorios' };
  }

  if (name.trim().length < 3) {
    return { ok: false, message: 'El nombre debe contener al menos 3 caracteres' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { ok: false, message: 'Ingresa un correo válido' };
  }

  return { ok: true };
}
