<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue/dist/vue.js';

// coger info de url
const route = useRoute();

interface User {
    id: number,
    name: string,
    surname: string,
}

const userId = ref('userId');
const mockUser = reactive<User>({
    id: 1,
    name: "nombre",
    surname: "apellido",
});

// ... fetch
mockUser.id = +route.params.id;

// TODO
// Mirar los navigation-guards

// Cada componente hace su petición, eso para algunas cosas puede suponer un problema
// para solucionar eso entra en juego pinia, que puede ser interesante para el userAuth y esas cosas

// TODO - pinia
// Mirar la documentación la parte de setup stores

</script>

<template>
    <main>
        <p>Hola desde UserDetailsView</p>
        <p>Datos del estado {{ userId }}</p>
        <p>Datos del usuario {{ mockUser }}</p>
    </main>
</template>
