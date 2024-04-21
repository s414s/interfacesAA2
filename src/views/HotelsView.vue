<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Hotel, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

// type ReadonlyHeaders = VDataTable['$props']['headers'];
const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'name' },
    { title: 'Address', align: 'center', key: 'address' },
    { title: 'City', align: 'center', key: 'city' },
    { title: 'N of rooms', align: 'center', key: 'numberOfRooms' },
];

const router = useRouter();

const userStore = useUserStore();
const { isAdmin, jwt } = storeToRefs(userStore);

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
        <button v-show="isAdmin">Create new hotel</button>
    </div>

    <div v-if="isLoading">
        <v-container>
            <v-row justify="center">
                <v-progress-circular color="primary" indeterminate :size="43"></v-progress-circular>
            </v-row>
        </v-container>
    </div>

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