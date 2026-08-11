<template>

    <h3>Admin users</h3>
</template>


<script setup lang="ts">
import { getUsersAction } from '@/actions';


getUsersAction();

</script>