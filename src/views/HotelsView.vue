<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Hotel } from '@/types/TypesDTO';
import { reactive } from 'vue';

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'name' },
    { title: 'Address', align: 'center', key: 'address' },
    { title: 'City', align: 'center', key: 'city' },
    { title: 'Number of rooms', align: 'center', key: 'numberOfRooms' },
];

const { user, isAuthed, jwt } = useUserStore();

const hotels: Hotel[] = reactive([]);

const baseUrl = "http://localhost:5093/";

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

fetch(baseUrl + "hotels", requestOptions)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        hotels.push(...data);
    });

</script>

<template>
    <h2>Hotels</h2>
    <v-data-table :headers="headers" :items="hotels" density="compact" :sort-by="[{ key: 'name', order: 'desc' }]" />
</template>