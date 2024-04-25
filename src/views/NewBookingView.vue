<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { Room } from '@/types/TypesDTO';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import CounterMixMax from '@/components/CounterMixMax.vue';
import RoomStats from '@/components/RoomStats.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

import { GET, POST } from '@/helpers/api';

const route = useRoute();
const idRoom = +route.params.idRoom;
const { jwt } = useUserStore();
const router = useRouter();

console.log("datetime in a format", new Date().toISOString());

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

// const data = GET("rooms/" + idRoom, jwt);
// console.log("DATAAAAAA", data);

const baseUrl = "http://localhost:5093/";
fetch(baseUrl + "rooms/" + idRoom, requestOptions)
    .then(res => res.json())
    .then(data => {
        room.value = data;
        isLoading.value = false;
    });

function bookRoom() {
    const body = {
        id: 0,
        from: date.value?.[0].toISOString(),
        until: date.value?.[1].toISOString(),
        hotelName: "noHotelName",
        guests: [{ name: name.value, dni: dni.value }]
    };

    console.log("body", body);
    console.log("guests", body.guests);

    if (!body.from || !body.until || guests.value < 1 || guests.value > 4 || name.value == '' || dni.value == '') {
        alert("missing data");
        return;
    }

    // const res = POST("rooms/" + idRoom, body, jwt);

    const reqOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(body)
    };

    const baseUrl = "http://localhost:5093/";
    fetch(baseUrl + "bookings/" + idRoom, reqOptions)
        .then(res => {
            if (!res.ok) {
                alert(`Error realizando la reserva status: ${res.status} ${res.statusText}`);
                throw new Error(`Error realizando la reserva, status: ${res.status} ${res.statusText}`);
            }
            router.push({ path: `/bookings` });
        })
        .catch(err => alert(err));
};

const isLoading = ref<boolean>(true);
const room = ref<Room | null>(null);
const guests = ref(1);
const name = ref("");
const dni = ref("");
const date = ref<[Date, Date] | null>();

const counter = ref(1);
const updateCounter = (value: number) => {
    counter.value = value;
};

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 1));
    date.value = [startDate, endDate];
});
</script>

<template>
    <LoadingIcon :isLoading="isLoading"></LoadingIcon>
    <div class="title">
        <h1>New Booking</h1>
        <v-row justify="space-between">
            <v-col cols="auto">
                <p>Dates:</p>
                <Datepicker :enable-time-picker="false" v-model="date"
                    multi-calendars="{ solo: false, static: true, count: 2 }" solo range min-date="new Date()" />
            </v-col>
        </v-row>

        <v-col cols="auto">
            <p>Number of guests:</p>
            <CounterMixMax :counter="counter" :min=1 :max=4 @update-counter="updateCounter">
            </CounterMixMax>
        </v-col>

        <v-sheet class="mx-auto" width="300">
            <v-form @submit.prevent>
                <v-text-field v-model="name" label="Guest name"></v-text-field>
                <v-text-field v-model="dni" label="DNI"></v-text-field>
                <!-- <v-btn class="mt-2" color="info" type="submit" block>Submit</v-btn> -->
            </v-form>
        </v-sheet>
    </div>

    <v-container v-if="!isLoading">
        <v-row justify="center">
            <RoomStats :capacity="room?.capacity" :storey="room?.storey" :type="room?.type"></RoomStats>
        </v-row>
        <v-row justify="center">
            <v-btn :disabled="name == '' || dni == ''" color="secondary" @click="bookRoom">Book</v-btn>
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