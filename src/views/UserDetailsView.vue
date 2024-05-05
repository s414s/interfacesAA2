<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import UserInfo from '@/components/UserInfo.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

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
    <LoadingIcon :isLoading="isLoading"></LoadingIcon>
    <v-container v-if="!isLoading">
        <UserInfo :user="user" />
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>