<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const idRoom = +route.params.idRoom;
const { jwt } = useUserStore();

const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);

// Setting start to now and end to 24 hours later
startDate.value = new Date();
endDate.value = new Date(startDate.value.getTime() + 24 * 60 * 60 * 1000);


const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

function bookRoom(from: Date, until: Date, idRoom: number) {
    const baseUrl = "http://localhost:5093/";
    fetch(baseUrl + "rooms/" + "idRoom", requestOptions)
        .then(res => res.json())
        .then(data => { console.log(data); });
};

</script>

<template>
    <div class="title">
        <h1>New Booking</h1>
        <p>{{ idRoom }}</p>
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