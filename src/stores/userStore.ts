import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/User';

export const useUserStore = defineStore('user', () => {
    const isAuthed = ref(false);
    const user = reactive<User>({ id: 0, name: "nombre", surname: "apellido", isAdmin: true });

    function fetchUser() {
        fetch('https://dummyjson.com/user')
            .then(res => res.json())
            .then(data => {
                user.id = data.id;
                user.name = data.name;
                user.surname = data.surname;

                isAuthed.value = true;
            });
    }

    return { user, isAuthed, fetchUser };
});
