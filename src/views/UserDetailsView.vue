<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';
import { ref } from 'vue';

const { user, fetchUser } = useUserStore();
const isLoading = ref(true);

if (user.id === 0) {
    fetchUser();
    isLoading.value = false;
} else {
    isLoading.value = false;
}
</script>

<template>
    <div class="title">
        <h1>User data</h1>
    </div>

    <div v-if="isLoading">
        <v-container>
            <v-row justify="center">
                <v-progress-circular color="primary" indeterminate :size="43"></v-progress-circular>
            </v-row>
        </v-container>
    </div>

    <v-container v-if="!isLoading">
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