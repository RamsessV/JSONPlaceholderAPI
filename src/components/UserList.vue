<template>
  <UserCard
    v-for="user in users"
    @on-delete="$emit('onDelete', user.id)"
    :key="user.id"
    v-bind="user"
  />
</template>

<script setup lang="ts">
import type { User } from '@/types';
import UserCard from './UserCard.vue';

interface Props {
  users: User[];
}

defineProps<Props>();

defineEmits<{
  onDelete: [id: number];
}>();
</script>
