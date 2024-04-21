<!-- <script setup lang="ts">
</script> -->
<script setup lang="ts">
import { ref } from 'vue';

// export default {
//     data: () => ({
//         firstName: '',
//         rules: [
//             value => {
//                 if (value) return true;

//                 return 'You must enter a first name.';
//             },
//         ],
//     }),
// };

const items = ref([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
]);

// install vee validate
// const name = useField('name');
// const phone = useField('phone');
// const email = useField('email');
// const select = useField('select');
// const checkbox = useField('checkbox')
</script>

<template>
    <v-sheet class="mx-auto" width="300">
        <h3>New Booking</h3>
        <v-form @submit.prevent>
            <v-text-field label="Guest name"></v-text-field>
            <v-text-field label="DNI"></v-text-field>

            <v-select :items="items" label="Hotel"></v-select>
            <v-select :items="items" label="Room"></v-select>

            <v-btn class="mt-2" color="info" type="submit" block>Submit</v-btn>
        </v-form>
    </v-sheet>
</template>

<style>
h3 {
    text-align: center;
    padding: 1rem;
}
</style>