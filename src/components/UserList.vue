<template>
    <UserCard 
        v-for="user in users"
        :key="user.id"
        v-bind="user" />
</template>


<script setup lang="ts">
import type { User } from '@/types';
import UserCard from './UserCard.vue';


interface Props {
    users: User[];
}

defineProps<Props>();

</script>