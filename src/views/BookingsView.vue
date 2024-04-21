<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Booking, Hotel, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'hotelName' },
    { title: 'From', align: 'center', key: 'from' },
    { title: 'Until', align: 'center', key: 'until' },
];

const router = useRouter();
const userStore = useUserStore();
const { jwt } = storeToRefs(userStore);

const isLoading = ref<boolean>(true);
const bookings: Booking[] = reactive([]);

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

fetch(baseUrl + "bookings", requestOptions)
    .then(res => res.json())
    .then(data => {
        bookings.push(...data);
        isLoading.value = false;
    });

</script>

<template>
    <div class="title">
        <h1>Bookings</h1>
    </div>

    <div v-if="isLoading">
        <v-container>
            <v-row justify="center">
                <v-progress-circular color="primary" indeterminate :size="43"></v-progress-circular>
            </v-row>
        </v-container>
    </div>

    <v-container v-if="!isLoading">
        <v-data-table :headers="headers" :items="bookings" density="compact" :sort-by="[{ key: 'id', order: 'asc' }]">
            <template v-slot:item="{ item }">
                <tr @click="router.push({ path: `hotels/${item.id}` })" style="cursor: pointer">
                    <td align="center"> {{ capitalizeFirstLetter(item.hotelName) }}</td>
                    <td align="center">{{ item.from }}</td>
                    <td align="center">{{ item.until }}</td>
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