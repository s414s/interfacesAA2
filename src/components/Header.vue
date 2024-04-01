<script setup lang="ts">
</script>

<template>
    <nav class="header-container">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/hotels">Hotels</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
        <RouterLink to="/newbooking">New Booking</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink to="/user">User</RouterLink>
        <RouterLink to="/logout">Log out</RouterLink>
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
