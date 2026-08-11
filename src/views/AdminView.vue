<template>
  <h3>Admin users</h3>

  <template v-if="error">
    <MainButton title="Intentar de nuevo" type="button" @on-click="retry"/>
  </template>

  <template v-else>
    <UserList :users="users" />
    <BottomPagination :page="page" :last-page="users.length < 3" />
  </template>

  <ToastComponent v-if="visible" :message="message" :type="type" />
</template>

<script setup lang="ts">
import BottomPagination from '@/components/BottomPagination.vue';
import MainButton from '@/components/MainButton.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import UserList from '@/components/UserList.vue';
import { usePagination } from '@/composables/usePagination';
import { useToast } from '@/composables/useToast';
import { useUsers } from '@/composables/useUsers';
import { watch } from 'vue';

const { users, error, setPage, retry } = useUsers();

const { page } = usePagination();

const { message, visible, type, showToast } = useToast();

watch(error, (hasError) => {
  if (hasError) {
    showToast('Algo salió mal, inténtalo de nuevo', 'error');
  }
});

watch(page, (newPage) => {
  setPage(newPage);
});
</script>
