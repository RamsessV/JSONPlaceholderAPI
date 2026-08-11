<template>

    <h3>Admin users</h3>

    <UserList :users="users"/>
</template>


<script setup lang="ts">
import UserList from '@/components/UserList.vue';
import { useUsers } from '@/composables/useUsers';


const {users} = useUsers();


</script>