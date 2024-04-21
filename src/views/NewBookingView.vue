<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { VDataTable } from 'vuetify/components';
import type { Room } from '@/types/TypesDTO';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const idHotel = parseInt(route.params.idHotel.toString());
// https://vueschool.io/lessons/route-meta-fields?friend=vuerouter

const { jwt } = useUserStore();

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headers: ReadonlyHeaders = [
    { title: 'Storey', align: 'center', key: 'address' },
    { title: 'Type', align: 'center', key: 'city' },
    { title: 'Capacity', align: 'center', key: 'numberOfRooms' },
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

fetch(baseUrl + "hotels/" + "hotelId/" + "rooms", requestOptions)
    .then(res => res.json())
    .then(data => {
        rooms.push(...data);
    });

</script>

<template>
    <div class="title">
        <h1>New Booking</h1>
        <p>{{ idHotel }}</p>
    </div>

    <v-container>
        <v-row justify="start">
            <v-date-picker width="400"></v-date-picker>
        </v-row>
    </v-container>

    <!-- <v-container>
        <v-row justify="center">
            <v-date-picker width="400"></v-date-picker>
        </v-row>
    </v-container> -->

</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>