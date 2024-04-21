<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { Room } from '@/types/TypesDTO';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import VueDatePicker from '@vuepic/vue-datepicker';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const route = useRoute();
const idRoom = +route.params.idRoom;
const { jwt } = useUserStore();

const isLoading = ref<boolean>(false);
const room = ref<Room | null>(null);
const guests = ref(1);

const currentDate = new Date();
const startDate = ref<Date>(currentDate);
const endDate = ref<Date>(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000));

console.log("datetime in a format", new Date().toISOString().substring(0, 10));

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

const baseUrl = "http://localhost:5093/";
fetch(baseUrl + "rooms/" + idRoom, requestOptions)
    .then(res => res.json())
    .then(data => {
        room.value = data;
        isLoading.value = false;
        console.log(data);
    });

function bookRoom(from: Date, until: Date, idRoom: number, nGuests: number) {
    fetch(baseUrl + "rooms/" + "idRoom", requestOptions)
        .then(res => res.json())
        .then(data => { console.log(data); });
};

const increaseGuests = () => { guests.value = guests.value === 4 ? 4 : guests.value + 1; };
const decreaseGuests = () => { guests.value = guests.value === 1 ? 1 : guests.value - 1; };
</script>

<template>
    <div class="title">
        <h1>New Booking</h1>
        <v-row justify="space-between">
            <v-col cols="auto">
                <p>From:</p>
                <Datepicker :enable-time-picker="false" v-model="startDate" />
            </v-col>
            <v-col cols="auto">
                <p>Until:</p>
                <Datepicker :enable-time-picker="false" v-model="endDate" />
            </v-col>
        </v-row>

        <v-col cols="auto">
            <p>Number of guests:</p>
            <v-row justify="center" class="info">
                <v-btn color="primary" @click="decreaseGuests">-</v-btn>
                <p>{{ guests }}</p>
                <v-btn color="primary" @click="increaseGuests">+</v-btn>
            </v-row>
        </v-col>

    </div>

    <template v-if="isLoading">
        <v-container>
            <v-row justify="center">
                <v-progress-circular color="primary" indeterminate :size="43"></v-progress-circular>
            </v-row>
        </v-container>
    </template>

    <v-container v-if="!isLoading">
        <v-row justify="center">
            <!-- https://vuetifyjs.com/en/components/date-pickers/#allowed-dates -->

            <div>
                <h3>Room Info:</h3>
                <v-row justify="space-between" class="info">
                    <p>Capacity: {{ room?.capacity }}</p>
                    <p>Storey: {{ room?.storey }}</p>
                    <p>Type: {{ room?.type }}</p>
                </v-row>
            </div>
        </v-row>

        <v-row justify="center">
            <v-btn color="secondary" @onclick="console.log('button pressed')">Book</v-btn>
        </v-row>
    </v-container>

</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.info {
    padding: 1rem;
    gap: 1.5rem;
}
</style>