<script setup lang="ts">
import type { VDataTable } from 'vuetify/components';

const items = [
    {
        name: 'African Elephant',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'European Elephant',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
    {
        name: 'American Elephant',
        species: 'Loxodonta africana',
        diet: 'Herbivore',
        habitat: 'Savanna, Forests',
    },
];

type ReadonlyHeaders = VDataTable['$props']['headers'];

const headers: ReadonlyHeaders = [
    { title: 'Animal Name', align: 'center', key: 'name' },
    { title: 'Breed', align: 'center', key: 'species' },
    { title: 'Diet', align: 'center', key: 'diet' },
    { title: 'Location', align: 'center', key: 'habitat' },
]

</script>

<template>
    <h2>Hotels</h2>

    <v-data-table :headers="headers" :items="items" density="compact" :sort-by="[{ key: 'name', order: 'desc' }]" />
    <!-- <v-data-table-virtual :headers="headers" :items="items" height="400" item-value="name"></v-data-table-virtual> -->
</template>