import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/TypesDTO';

export const useUserStore = defineStore('user', () => {
    console.log("inicializando userStore");
    console.log("valor del localstorage", localStorage.getItem("token"));

    const isAuthed = ref<boolean>(localStorage.getItem("token") ? true : false);
    const jwt = ref<string | null>(localStorage.getItem("token") ? localStorage.getItem("token") : null);
    const user = reactive<User>({ id: 0, name: "name", surname: "surname", role: "role" });

    function setJwt(newJwt: string) {
        window.localStorage.setItem("token", newJwt);
        jwt.value = newJwt;
    }

    function setIsAuthed(value: boolean) {
        isAuthed.value = value;
    }

    function fetchUser() {
        const baseUrl = "http://localhost:5093/";
        fetch(baseUrl + 'auth/me', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token") ?? ""}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("calling fetchUser");
                console.log(data);

                user.id = data.id;
                user.name = data.name;
                user.surname = data.surname;
                user.role = data.role;

                isAuthed.value = true;
            });
    }

    function logout() {
        user.id = 0;
        user.name = "username";
        user.surname = "userSurname";
        user.role = "role";

        isAuthed.value = false;
        jwt.value = null;
        localStorage.removeItem("token");
    }

    return { user, isAuthed, fetchUser, jwt, setJwt, setIsAuthed, logout };
});
