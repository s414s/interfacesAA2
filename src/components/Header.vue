<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const { isAuthed } = useUserStore();

</script>

<template>
    <nav class="header-container">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/hotels">Hotels</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
        <RouterLink v-show="isAuthed" to="/newbooking">New Booking</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink v-if="!isAuthed" to="/login">Log in</RouterLink>
        <RouterLink v-else to="/logout">Log out</RouterLink>
    </nav>
</template>

<style scoped>
.header-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 2px solid green;
    gap: 2rem;
    /* width: 100vw; */
}

.cell {
    border: 2px solid green;
}
</style>
