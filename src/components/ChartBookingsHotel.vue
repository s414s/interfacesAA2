<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Booking } from '@/types/TypesDTO';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

// const bookings: Booking[] = reactive([]);
const props = defineProps<{ bookings: Booking[]; }>();

// Categories
const hotelNames = Array.from(props.bookings.map(x => x.hotelName));
console.log("hotelNames", hotelNames);

// Series
const bookingsPerHotel = hotelNames.map(x => props.bookings.filter(y => y.hotelName === x).length);
console.log("bookingsPerHotel", bookingsPerHotel);

const options = {
    chart: {
        id: 'vuechart-bookings-per-hootel',
    },
    xaxis: {
        // categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        // categories: ["Boston", "Altamira"]
        categories: hotelNames.map(x => capitalizeFirstLetter(x))
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
    data: bookingsPerHotel,
    // data: [70, 91]
    // data: [30, 40, 45, 50, 49, 60, 70, 91]
}];
</script>

<template>
    <!-- https://medium.com/@vickiec630/easy-way-to-integrate-apexcharts-into-vue-ccb17f06e31e -->
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</template>