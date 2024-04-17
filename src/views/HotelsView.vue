<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Hotel } from '@/types/TypesDTO';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'name' },
    { title: 'Address', align: 'center', key: 'address' },
    { title: 'City', align: 'center', key: 'city' },
    { title: 'Number of rooms', align: 'center', key: 'numberOfRooms' },
    { title: '', align: 'center' },
];

const { user, isAuthed, jwt } = useUserStore();
const router = useRouter();

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
        hotels.push(...data);
    });

</script>

<template>
    <h2>Hotels</h2>

    <v-container>
        <v-data-table :headers="headers" :items="hotels" density="compact" :sort-by="[{ key: 'id', order: 'desc' }]">
            <template v-slot:item="{ item }">
                <tr>
                    <td>
                        {{ item.name }}</td>
                    <td align="center">{{ item.address }}</td>
                    <td align="center">{{ item.city }}</td>
                    <td align="center">{{ item.numberOfRooms }}</td>
                    <!-- <td align="center" @click="router.push({ name: 'hotelrooms', params: { idHotel: item.id } })"
                        style="cursor: pointer"> Ver </td> -->
                    <td align="center" @click="router.push({ path: `hotels/${item.id}` })" style="cursor: pointer"> Ver
                    </td>
                </tr>
            </template>
        </v-data-table>
    </v-container>

</template>