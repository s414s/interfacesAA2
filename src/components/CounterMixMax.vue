<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    counter: Number,
    min: Number,
    max: Number,
});

const emits = defineEmits(['update-counter']);

const increment = () => {
    emits('update-counter', props.counter === props.max ? props.max : (props.counter ?? 0) + 1);
};

const decrement = () => {
    emits('update-counter', props.counter === props.min ? props.min : (props.counter ?? 0) - 1);
};
</script>

<template>
    <v-row justify="center" class="info">
        <v-btn color="primary" @click="decrement">-</v-btn>
        <p>{{ props.counter }}</p>
        <v-btn color="primary" @click="increment">+</v-btn>
    </v-row>
</template>