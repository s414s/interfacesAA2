<script setup lang="ts">
import BookingsTable from '@/components/BookingsTable.vue';
</script>

<template>
    <div class="title">
        <h1>Bookings</h1>
    </div>
    <v-container>
        <BookingsTable></BookingsTable>
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>