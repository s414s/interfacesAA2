<script setup lang="ts">
import type { Room } from '@/types/TypesDTO';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingIcon from '@/components/LoadingIcon.vue';
import RoomsTable from '@/components/RoomsTable.vue';
import { GET } from '@/helpers/api';

const route = useRoute();
const idHotel = +route.params.idHotel;
const isLoading = ref(true);
const rooms: Room[] = reactive([]);

const fetchData = async () => {
    try {
        const res = await GET(`hotels/${idHotel}/rooms`);
        rooms.push(...res.rooms);
        isLoading.value = false;
    } catch (error) {
        alert(error);
    }
};

fetchData();
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