<script setup lang="ts">
</script>

<template>
    <nav class="header-container">
        <RouterLink to="/">Item1</RouterLink>
        <RouterLink to="/about">Item2</RouterLink>
        <RouterLink to="/about">Item3</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
    </nav>
</template>

<style scoped>
.header-container {
    display: flex;
    flex-direction: row;
    border: 2px solid green;
    /* width: 100vw; */
}

.cell {
    border: 2px solid green;
}
</style>
