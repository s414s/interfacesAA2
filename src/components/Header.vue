<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const { logout } = useUserStore();
</script>

<template>
    <nav class="header-container">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/hotels">Hotels</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <!-- <RouterLink v-show="!isAuthed" to="/login">Log in</RouterLink> -->
        <!-- <RouterLink v-show="isAuthed" to="/logout">Log out</RouterLink> -->
        <a href="#" @click="logout">Log out</a>
    </nav>
</template>

<style scoped>
.header-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 2rem 0rem;
    /* border: 2px solid green; */
    gap: 2rem;
    /* width: 100vw; */
}

a,
a:visited {
    color: black;
    text-decoration: none;
}
</style>