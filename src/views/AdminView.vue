<template>
  <template v-if="loading"><LoadingSpinner /></template>

  <template v-if="error">
    <MainButton title="Intentar de nuevo" type="button" @on-click="fetchUsers" />
  </template>

  <template v-else>
    <h3>Página {{ page }}</h3>

    <form class="search-form">
      <div class="header-form">
        <h2>Buscar usuarios</h2>
        <MainButton type="button" title="Agregar usuario" @on-click="$router.push({name: 'add-user-form'})" />
      </div>

      <div class="search-form__fields">
        <div class="search-form__field">
          <label for="name">Nombre</label>
          <CustomInput v-model="searchName" type="text" />
        </div>

        <div class="search-form__field">
          <label for="email">Compañía</label>
          <CustomInput v-model="searchCompany" type="text" />
        </div>
      </div>
    </form>

    <UserList :users="users" />
    <BottomPagination
      @next-page="nextPage"
      @previous-page="previousPage"
      :page="page"
      :last-page="lastPage"
    />
  </template>

  <ToastComponent v-if="visible" :message="message" :type="type" />
</template>

<script setup lang="ts">
import BottomPagination from '@/components/BottomPagination.vue';
import CustomInput from '@/components/CustomInput.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MainButton from '@/components/MainButton.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import UserList from '@/components/UserList.vue';
import { useToast } from '@/composables/useToast';
import { useUsers } from '@/composables/useUsers';
import { onMounted, watch } from 'vue';

const {
  users,
  error,
  page,
  loading,
  searchName,
  searchCompany,
  nextPage,
  previousPage,
  lastPage,
  fetchUsers,
} = useUsers();

onMounted(fetchUsers);

const { message, visible, type, showToast } = useToast();

watch(error, (hasError) => {
  if (hasError) {
    showToast('Algo salió mal, inténtalo de nuevo', 'error');
  }
});
</script>

<style scoped>
.search-form {
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 20px;
}

.header-form {
  display: flex;
  justify-content: space-between;
}

.search-form h2 {
  margin-bottom: 20px;
}

.search-form__fields {
  display: flex;
  gap: 20px;
}

.search-form__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}

.search-form__field label {
  font-weight: 600;
}

@media (max-width: 600px) {
  .search-form__fields {
    flex-direction: column;
  }
}
</style>
