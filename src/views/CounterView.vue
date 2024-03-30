<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();
</script>

<template>
  <main>
    <p>Hola desde CounterView</p>
    <div>
      <p>Count: {{ store.count }}</p>
      <p>Double: {{ store.doubleCount }}</p>
      <div> <button @click="store.increment()">Incrementar</button></div>
    </div>
  </main>
</template>
