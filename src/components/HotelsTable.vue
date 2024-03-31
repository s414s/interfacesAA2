<script setup lang="ts">
import type { Hotel } from '../types/TypesDTO';

const props = defineProps<{
    hotels: Hotel[];
}>();

</script>

<template>
    <ul>
        <li v-for="hotel in props.hotels" :key="hotel.id">
            {{ hotel.id }}, {{ hotel.name }}, {{ hotel.city }}, {{ hotel.city }}
        </li>
    </ul>
</template>
