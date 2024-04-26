<script setup lang="ts">
import ChartBookingsHotel from '@/components/ChartBookingsHotel.vue';
</script>

<template>
    <div class="title">
        <h1>Dashboard</h1>
    </div>
    <v-container class="border">
        <ChartBookingsHotel></ChartBookingsHotel>
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>