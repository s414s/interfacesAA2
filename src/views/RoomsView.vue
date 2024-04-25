<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Room, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LoadingIcon from '@/components/LoadingIcon.vue';

const route = useRoute();
const router = useRouter();
const { jwt } = useUserStore();
const idHotel = +route.params.idHotel;

const headers: ReadonlyHeaders = [
    { title: 'Storey', align: 'center', key: 'storey' },
    { title: 'Type', align: 'center', key: 'type' },
    { title: 'Capacity', align: 'center', key: 'capacity' },
];

const isLoading = ref(true);
const rooms: Room[] = reactive([]);

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

const baseUrl = "http://localhost:5093/";
fetch(`${baseUrl}hotels/${idHotel}/rooms`, requestOptions)
    .then(res => res.json())
    .then(data => {
        rooms.push(...data.rooms);
        isLoading.value = false;
    });
</script>

<template>
    <div class="title">
        <h1>Rooms</h1>
    </div>
    <LoadingIcon :isLoading="isLoading"></LoadingIcon>
    <v-container v-if="!isLoading">
        <v-data-table :headers="headers" :items="rooms" density="compact" :sort-by="[{ key: 'id', order: 'asc' }]">
            <template v-slot:item="{ item }">
                <tr @click="router.push({ path: `/newbooking/${item.id}` })" style="cursor: pointer">
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