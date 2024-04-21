<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

// mockUser.id = +route.params.id;
const { user, fetchUser } = useUserStore();

if (user.id === 0) {
    fetchUser();
}
</script>

<template>
    <div class="title">
        <h1>User data</h1>
    </div>
    <v-container>
        <div class="title">
            <p>Name: {{ capitalizeFirstLetter(user?.name ?? "user name") }}</p>
            <p>Surname: {{ capitalizeFirstLetter(user?.surname ?? "user surname") }}</p>
            <p>Role: {{ user?.role ?? "no role found" }}</p>
        </div>
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>