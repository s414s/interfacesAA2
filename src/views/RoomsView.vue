<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import type { Room } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIcon from '@/components/LoadingIcon.vue';
import RoomsTable from '@/components/RoomsTable.vue';

const route = useRoute();
const { jwt } = useUserStore();
const idHotel = +route.params.idHotel;
const isLoading = ref(true);
const rooms: Room[] = reactive([]);

const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

const baseUrl = "http://localhost:5093/";
fetch(`${baseUrl}hotels/${idHotel}/rooms`, requestOptions)
    .then(res => res.json())
    .then(data => {
        rooms.push(...data.rooms);
        isLoading.value = false;
    });
</script>

<template>
    <div class="title">
        <h1>Rooms</h1>
    </div>
    <LoadingIcon :isLoading="isLoading"></LoadingIcon>
    <v-container v-if="!isLoading">
        <RoomsTable :rooms="rooms"></RoomsTable>
    </v-container>
</template>

<style>
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>