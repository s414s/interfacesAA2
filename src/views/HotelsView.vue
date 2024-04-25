<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Hotel, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';
import { GET } from '@/helpers/api';
import LoadingIcon from '@/components/LoadingIcon.vue';

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'name' },
    { title: 'Address', align: 'center', key: 'address' },
    { title: 'City', align: 'center', key: 'city' },
    { title: 'N of rooms', align: 'center', key: 'numberOfRooms' },
];

const { jwt } = useUserStore();
const router = useRouter();
const isLoading = ref<boolean>(true);
const hotels: Hotel[] = reactive([]);

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

// const res = await GET("hotels", jwt);
// console.log("RESSS", res);

fetch(baseUrl + "hotels", requestOptions)
    .then(res => res.json())
    .then(data => {
        hotels.push(...data);
        isLoading.value = false;
    });

</script>

<template>
    <div class="title">
        <h1>Hotels</h1>
    </div>
    <LoadingIcon :isLoading="isLoading"></LoadingIcon>
    <v-container v-if="!isLoading">
        <v-data-table :headers="headers" :items="hotels" density="compact" :sort-by="[{ key: 'id', order: 'asc' }]">
            <template v-slot:item="{ item }">
                <tr @click="router.push({ path: `hotels/${item.id}` })" style="cursor: pointer">
                    <td align="center"> {{ capitalizeFirstLetter(item.name) }}</td>
                    <td align="center">{{ item.address }}</td>
                    <td align="center">{{ item.city }}</td>
                    <td align="center">{{ item.numberOfRooms }}</td>
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