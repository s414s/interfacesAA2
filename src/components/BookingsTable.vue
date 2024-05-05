<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';
import type { Booking, ReadonlyHeaders } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';
import LoadingIcon from '@/components/LoadingIcon.vue';
import { DELETE, GET } from '@/helpers/api';

const headers: ReadonlyHeaders = [
    { title: 'Hotel Name', align: 'center', key: 'hotelName' },
    { title: 'From', align: 'center', key: 'from' },
    { title: 'Until', align: 'center', key: 'until' },
    { title: 'Delete', align: 'center', key: '' },
];

const isLoading = ref<boolean>(true);
const bookings: Booking[] = reactive([]);

const deleteBooking = async (idBooking: number) => {
    isLoading.value = true;
    try {
        await DELETE("bookings/" + idBooking);
        const index = bookings.findIndex(x => x.id === idBooking);
        if (index !== -1) {
            bookings.splice(index, 1);
        }
        isLoading.value = false;
    } catch (error) {
        alert(error);
        isLoading.value = false;
    }
};

const fetchData = async () => {
    try {
        const res = await GET("bookings");
        bookings.push(...res);
        isLoading.value = false;
    } catch (error) {
        alert(error);
    }
};

fetchData();
</script>

<template>
    <LoadingIcon :isLoading="isLoading" />

    <v-data-table v-if="!isLoading" :headers="headers" :items="bookings" density="compact"
        :sort-by="[{ key: 'id', order: 'asc' }]">
        <template v-slot:item="{ item }">
            <tr>
                <td align="center"> {{ capitalizeFirstLetter(item.hotelName) }}</td>
                <td align="center">{{ new Date(item.from).toLocaleDateString() }}</td>
                <td align="center">{{ new Date(item.until).toLocaleDateString() }}</td>
                <td align="center"><v-btn @click="deleteBooking(item.id)">X</v-btn></td>
            </tr>
        </template>
    </v-data-table>
</template>