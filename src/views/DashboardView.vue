<script setup lang="ts">
import { reactive } from 'vue';
import HotelsTable from '@/components/HotelsTable.vue';
import type { Hotel } from '@/types/TypesDTO';
import { useUserStore } from '@/stores/userStore';

const { user, isAuthed, jwt } = useUserStore();

// const hotels: Hotel[] = reactive([
//     { id: 1, name: 'Hotel A', city: 'City A', numberOfRooms: 2, rooms: [] },
//     { id: 2, name: 'Hotel B', city: 'City B', numberOfRooms: 2, rooms: [] },
// ]);

const hotels: Hotel[] = reactive([]);

const baseUrl = "http://localhost:5093/";

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
    // body: JSON.stringify({ name: 'Vue 3 POST Request Example' })
};

fetch(baseUrl + "/hotels", requestOptions)
    .then(res => res.json())
    .then(data => hotels.push(...data));

// console.log(hotels);
</script>

<template>
    <div class="title">
        <h1>Dashboard</h1>
    </div>

    <v-container class="border">
        <v-row no-gutters class="border">
            <v-col cols="12" sm="12">
                <v-sheet class="ma-1 pa-1 border">
                    <p>Column 1 data</p>
                    <p>Column 1 data</p>
                </v-sheet>
            </v-col>
        </v-row>

        <v-row no-gutters class="border">
            <v-col cols="12" sm="6">
                <v-sheet class="ma-1 pa-1">
                    <p>Column 1 data</p>
                </v-sheet>
                <v-sheet class="ma-1 pa-1">
                    <p>Column 1 data</p>
                </v-sheet>
            </v-col>
        </v-row>

    </v-container>
    <HotelsTable :hotels="hotels" />
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>