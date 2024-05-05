<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    capacity: Number,
    storey: Number,
    type: String,
});
</script>

<template>
    <div>
        <v-row justify="space-between" class="info">
            <p>Room Info:</p>
            <p>Capacity: {{ props.capacity }}</p>
            <p>Storey: {{ props.storey }}</p>
            <p>Type: {{ props.type }}</p>
        </v-row>
    </div>
</template>