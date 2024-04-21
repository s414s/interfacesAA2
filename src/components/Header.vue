<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const { logout, isAuthed } = useUserStore();
const token = window.localStorage.getItem('token');
</script>

<template>
    <!-- <v-container class="header-container" v-if="token"> -->
    <v-container>
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
    </v-container>

    <!-- <v-container class="header-container-landing" v-if="!token">
        <nav v-if="!isAuthed">
            <RouterLink to="/login">Login</RouterLink>
        </nav>
    </v-container> -->

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

.header-container-landing {
    display: flex;
    flex-direction: row;
    justify-content: end;
    padding: 2rem 0rem;
    border: 2px solid green;
    gap: 2rem;
    /* width: 100vw; */
}

a,
a:visited {
    color: black;
    text-decoration: none;
}
</style>