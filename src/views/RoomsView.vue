<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Room, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { jwt } = useUserStore();
const idHotel = parseInt(route.params.idHotel.toString());

const headers: ReadonlyHeaders = [
    { title: 'Storey', align: 'center', key: 'storey' },
    { title: 'Type', align: 'center', key: 'type' },
    { title: 'Capacity', align: 'center', key: 'capacity' },
];

const rooms: Room[] = reactive([]);

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

//fetch(baseUrl + "hotels/" + "hotelId/" + "rooms", requestOptions)
fetch(`${baseUrl}hotels/${idHotel}/rooms`, requestOptions)
    .then(res => res.json())
    .then(data => {
        rooms.push(...data.rooms);
    });

</script>

<template>
    <div class="title">
        <h1>Rooms</h1>
    </div>
    <v-container>
        <v-data-table :headers="headers" :items="rooms" density="compact" :sort-by="[{ key: 'id', order: 'asc' }]">
            <template v-slot:item="{ item }">
                <tr @click="router.push({ path: `bookings/${item.id}` })" style="cursor: pointer">
                    <td align="center"> {{ item.storey }}</td>
                    <td align="center">{{ item.type }}</td>
                    <td align="center">{{ item.capacity }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>