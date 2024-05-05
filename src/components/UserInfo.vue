<script setup lang="ts">
import type { User } from '../types/TypesDTO';
import { capitalizeFirstLetter } from '@/helpers/wordUtils';

const props = defineProps<{ user: User; }>();
</script>

<template>
    <div class="title">
        <p>Name: {{ capitalizeFirstLetter(props.user?.name ?? "user name") }}</p>
        <p>Surname: {{ capitalizeFirstLetter(props.user?.surname ?? "user surname") }}</p>
        <p>Role: {{ user?.role ?? "no role found" }}</p>
    </div>
</template>
