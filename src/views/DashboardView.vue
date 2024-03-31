<script setup lang="ts">
import { reactive } from 'vue';
import HotelsTable from '@/components/HotelsTable.vue';
import type { Hotel } from '@/types/TypesDTO';

const hotelsData: Hotel[] = reactive([
    { id: 1, name: 'Hotel A', city: 'City A', numberOfRooms: 2 },
    { id: 2, name: 'Hotel B', city: 'City B', numberOfRooms: 2 },
]);

</script>

<template>
    <main>
        Hello from dashboard
        Hotels Table:
        <HotelsTable :hotels="hotelsData" />
    </main>
</template>
