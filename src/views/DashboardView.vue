<script setup lang="ts">
import { reactive } from 'vue';
import HotelsTable from '@/components/HotelsTable.vue';
import type { Hotel } from '@/types/TypesDTO';

const hotels: Hotel[] = reactive([
    { id: 1, name: 'Hotel A', city: 'City A', numberOfRooms: 2, rooms: [] },
    { id: 2, name: 'Hotel B', city: 'City B', numberOfRooms: 2, rooms: [] },
]);

</script>

<template>
    <main>
        <h2>Dashboard</h2>
        <v-container class="border">
            <v-row no-gutters class="border">
                <v-col cols="12" sm="12">
                    <v-sheet class="ma-1 pa-1 border">
                        <p>Column 1 por lo que</p>
                        <p>Column 1 por lo que pueda pasar</p>
                    </v-sheet>
                </v-col>
            </v-row>

            <v-row no-gutters class="border">
                <v-col cols="12" sm="6">
                    <v-sheet class="ma-1 pa-1">
                        Column 1 por lo que
                    </v-sheet>
                    <v-sheet class="ma-1 pa-1">
                        Column 2
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
        <HotelsTable :hotels="hotels" />
    </main>
</template>
