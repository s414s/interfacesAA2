<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { reactive, ref } from 'vue';

// coger info de url
// const route = useRoute();
// mockUser.id = +route.params.id;

const { user, fetchUser } = useUserStore();

if (user.id === 0) {
    fetchUser();
}

// TODO - pinia
// Mirar la documentación la parte de setup stores
</script>

<template>
    <main>
        <h1>User data:</h1>
        <p>Name: {{ user?.name ?? "user name" }}</p>
        <p>Surname: {{ user?.surname ?? "user surname" }}</p>
        <p>Role: {{ user?.role ?? "no role found" }}</p>
    </main>
</template>
