<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const { isAuthed, fetchUser } = useUserStore();

</script>

<template>
    <main>
        <v-sheet class="mx-auto" width="300">
            <h3>Log in</h3>
            <v-form @submit.prevent>
                <v-text-field label="Username" type="text">
                </v-text-field>
                <v-text-field hide-details="auto" label="Password" type="password">
                </v-text-field>

                <v-btn class="mt-2" color="info" type="submit" block>Submit</v-btn>
            </v-form>
        </v-sheet>
    </main>
</template>
