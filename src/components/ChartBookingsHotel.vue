<script setup lang="ts">
import { ref } from 'vue';
import type { Booking } from '@/types/TypesDTO';
import { useUserStore } from '@/stores/userStore';
import { onBeforeMount } from 'vue';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

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

onBeforeMount(() => {
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
            console.log("data", data);
            const hotelNames = Array.from(new Set(data.map(x => x.hotelName)));
            const bookingsPerHotel = hotelNames.map(x => data.filter(y => y.hotelName === x).length);

            series.value[0].data = bookingsPerHotel;
            options.value = { ...options.value, xaxis: { ...options.value.xaxis, categories: hotelNames.map(x => capitalizeFirstLetter(x)) } };
        });
});
</script>

<template>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
</template>