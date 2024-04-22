<script setup lang="ts">
import { reactive } from 'vue';
import HotelsTable from '@/components/HotelsTable.vue';
import type { Hotel } from '@/types/TypesDTO';
import { useUserStore } from '@/stores/userStore';

const { jwt } = useUserStore();


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

const options = {
    chart: {
        id: 'vuechart-example'
    },
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
};
const series = [{
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
}]

</script>

<template>
    <div class="title">
        <h1>Dashboard</h1>
    </div>

    <v-container class="border">
        <!-- https://medium.com/@vickiec630/easy-way-to-integrate-apexcharts-into-vue-ccb17f06e31e -->
        <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
    </v-container>

</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>