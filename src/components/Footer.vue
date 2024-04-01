<script setup lang="ts">
</script>

<template>
    <div class="main-footer">
        <p>Copyright Alberto Salas {{ new Date().getFullYear() }}</p>
    </div>
</template>

<style scoped>
.main-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 1rem;
    /* border: 2px solid green; */
    background-color: bisque;
    width: 100vw;
}
</style>
