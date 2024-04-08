<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/types/TypesDTO';

// coger info de url
// const route = useRoute();
// ... fetch from url
// mockUser.id = +route.params.id;

const { jwt } = useUserStore();

const user = ref<User | undefined>(undefined);

const baseUrl = "http://localhost:5093/";
const requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
    },
};

fetch(baseUrl + "auth/me", requestOptions)
    .then(res => res.json())
    .then(data => {
        console.log("response", data);
    });

console.log(user);

// TODO
// Mirar los navigation-guards

// Cada componente hace su petición, eso para algunas cosas puede suponer un problema
// para solucionar eso entra en juego pinia, que puede ser interesante para el userAuth y esas cosas

// TODO - pinia
// Mirar la documentación la parte de setup stores

</script>

<template>
    <main>
        <p>User data:</p>
        <p>Name: {{ user?.name ?? "user name" }}</p>
        <p>Surname: {{ user?.surname ?? "user surname" }}</p>
        <p>Is Admin: {{ user?.isAdmin ?? false }}</p>
    </main>
</template>
