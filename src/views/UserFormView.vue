<template>
  <template v-if="loading"><LoadingSpinner /></template>

  <template v-else>
    <form @submit.prevent="handleSubmit" class="user-form">
      <h2>{{ id ? 'Actualiza la información del usuario' : 'Agrega un nuevo usuario' }}</h2>
      <p class="user-form__subtitle">Completa la información del usuario</p>

      <div class="user-form__fields">
        <div class="user-form__field">
          <label for="name">Nombre</label>
          <CustomInput v-model="user.name" type="text" />
        </div>

        <div class="user-form__field">
          <label for="email">Correo electrónico</label>
          <CustomInput v-model="user.email" type="text" />
        </div>

        <div class="user-form__field">
          <label for="company">Empresa</label>
          <CustomInput v-model="user.company" type="text" />
        </div>

        <MainButton title="Guardar" type="submit" />
      </div>
    </form>
  </template>
  <ToastComponent v-if="visible" :message="message" :type="type" />
</template>

<script setup lang="ts">
import { sleepAction } from '@/actions';
import CustomInput from '@/components/CustomInput.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MainButton from '@/components/MainButton.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import { useToast } from '@/composables/useToast';
import { useUserForm } from '@/composables/useUserForm';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

interface Props {
  id?: number;
}

const router = useRouter();
const { id } = defineProps<Props>();
const { user, setUser, save } = useUserForm();
const { visible, message, type, showToast } = useToast();
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  if (id) {
    const response = await setUser(id);
    if (!response) {
      showToast('Usuario no encontrado', 'error', 2);
      await sleepAction(2);
      router.replace('/admin');
    }
  }
  loading.value = false;
});

const handleSubmit = async () => {
  const response = save(user.name, user.email, user.company);

  if (!response.ok) showToast(response.message ?? 'Ha ocurrido un error', 'error');
  else {
    showToast(response.message ?? 'Todo bien', 'success');
    await sleepAction(2);
    router.replace('/admin');
  }
};
</script>

<style>
.user-form {
  width: min(100%, 480px);
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgb(0 0 0 / 6%);
}

.user-form h2 {
  margin: 0;
  font-size: 1.5rem;
}

.user-form__subtitle {
  margin: 0.5rem 0 1.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.user-form__fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.user-form__field label {
  font-size: 0.9rem;
  font-weight: 600;
}

.user-form__field input {
  padding: 0.7rem 0.8rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  font-size: 0.95rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.user-form__field input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgb(99 102 241 / 12%);
}
</style>
