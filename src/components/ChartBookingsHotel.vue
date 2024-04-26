<script setup lang="ts">
import { ref } from 'vue';
import type { Booking } from '@/types/TypesDTO';
import { useUserStore } from '@/stores/userStore';
import { onBeforeMount } from 'vue';

const { jwt } = useUserStore();

const options = ref({
    chart: {
        id: 'vuechart-bookings-per-hootel',
    },
    xaxis: {
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
});

const series = ref([{ data: [70, 91] }]);

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

onBeforeMount(() => {
    fetch(baseUrl + "bookings", requestOptions)
        .then(res => res.json() as Promise<Booking[]>)
        .then(data => {
            console.log("data", data);

            const hotelNames = Array.from(new Set(data.map(x => x.hotelName)));
            // console.log("hotel names on before mount", hotelNames);

            const bookingsPerHotel = hotelNames.map(x => data.filter(y => y.hotelName === x).length);
            // console.log("bookings per hotel on before mount", bookingsPerHotel);

            series.value[0].data = bookingsPerHotel;
            options.value.xaxis.categories = hotelNames;
        });
});
</script>

<template>
    <!-- https://medium.com/@vickiec630/easy-way-to-integrate-apexcharts-into-vue-ccb17f06e31e -->
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</template>