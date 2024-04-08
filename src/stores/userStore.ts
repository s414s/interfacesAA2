import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/TypesDTO';

export const useUserStore = defineStore('user', () => {
    const isAuthed = ref<boolean>(false);
    const jwt = ref<string | null>(null);
    const user = reactive<User>({ id: 0, name: "name", surname: "surname", isAdmin: false });

    function fetchUser() {
        fetch('http://localhost:5093/auth/me')
            .then(res => res.json())
            .then(data => {
                user.id = data.id;
                user.name = data.name;
                user.surname = data.surname;
                user.isAdmin = data.isAdmin;

                isAuthed.value = true;
            });
    }

    function logout() {
        user.id = 0;
        user.name = "username";
        user.surname = "userSurname";
        user.isAdmin = false;

        isAuthed.value = false;
    }

    return { user, isAuthed, fetchUser, jwt };
});
