<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';
import type { Room, ReadonlyHeaders } from '@/types/TypesDTO';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{ rooms: Room[]; }>();
const headers: ReadonlyHeaders = [
    { title: 'Storey', align: 'center', key: 'storey' },
    { title: 'Type', align: 'center', key: 'type' },
    { title: 'Capacity', align: 'center', key: 'capacity' },
];
</script>

<template>
    <v-data-table :headers="headers" :items="props.rooms" density="compact" :sort-by="[{ key: 'id', order: 'asc' }]">
        <template v-slot:item="{ item }">
            <tr @click="router.push({ path: `/newbooking/${item.id}` })" style="cursor: pointer">
                <td align="center"> {{ item.storey }}</td>
                <td align="center">{{ item.type }}</td>
                <td align="center">{{ item.capacity }}</td>
            </tr>
        </template>
    </v-data-table>
</template>