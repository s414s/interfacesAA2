<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Booking } from '@/types/TypesDTO';
import { useUserStore } from '@/stores/userStore';
import ChartBookingsHotel from '@/components/ChartBookingsHotel.vue';

const { jwt } = useUserStore();
const bookings: Booking[] = reactive([]);

const hotels: string[] = reactive([]);
const bookingsPerHotel: number[] = reactive([]);

const options = {
    chart: {
        id: 'vuechart-bookings-per-hootel',
    },
    xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        categories: ["Boston", "Altamira"]
    },
    plotOptions: {
        bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: false,
        }
    },
    dataLabels: {
        enabled: true
    }
};

const series = [{
    name: 'series-1',
    data: [70, 91]
    // data: [30, 40, 45, 50, 49, 60, 70, 91]
}];

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

fetch(baseUrl + "bookings", requestOptions)
    .then(res => res.json() as Promise<Booking[]>)
    .then(data => {
        console.log(data);

        // Categories
        const hotelNames = Array.from(data.map(x => x.hotelName));
        hotels.push(...hotelNames);
        console.log("hotels", hotels);

        // Series
        const series = hotelNames.map(x => data.filter(y => y.hotelName === x).length);
        bookingsPerHotel.push(...series);
        console.log("series", series);

        bookings.push(...data);
    });

</script>

<template>
    <div class="title">
        <h1>Dashboard</h1>
    </div>

    <v-container class="border">
        <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </v-container>

    <v-container class="border">
        <ChartBookingsHotel :bookings="bookings"></ChartBookingsHotel>
    </v-container>

</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>