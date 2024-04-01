<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <!-- TODO: if (!user.IsAuthenticated) -->
    <!-- <div>
        Sign In
    </div> -->

    <div class="main-container full-height full-width">
        <Header />
        <RouterView />
        <Footer />
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    /* border: 2px solid purple; */
}

.full-height {
    height: 100vh;
}

.full-width {
    width: 100vw;
}
</style>