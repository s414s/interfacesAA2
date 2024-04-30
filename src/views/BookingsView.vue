<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Booking, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'hotelName' },
    { title: 'From', align: 'center', key: 'from' },
    { title: 'Until', align: 'center', key: 'until' },
    { title: 'Delete', align: 'center', key: '' },
];

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

function deleteBooking(idBooking: number) {
    isLoading.value = true;
    const baseUrl = "http://localhost:5093/";
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
    };

    fetch(baseUrl + "bookings/" + idBooking, requestOptions)
        .then(res => {
            if (!res.ok) {
                isLoading.value = false;
                alert(`Error eliminando el booking ${res.status} ${res.statusText}`);
            }

            const index = bookings.findIndex(x => x.id === idBooking);
            if (index !== -1) {
                bookings.splice(index, 1);
            }

            isLoading.value = false;
        });
}
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
                <tr>
                    <td align="center"> {{ capitalizeFirstLetter(item.hotelName) }}</td>
                    <td align="center">{{ new Date(item.from).toLocaleDateString() }}</td>
                    <td align="center">{{ new Date(item.until).toLocaleDateString() }}</td>
                    <td align="center"><v-btn @click="deleteBooking(item.id)">X</v-btn></td>
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