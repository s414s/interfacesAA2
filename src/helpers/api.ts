import { useUserStore } from '@/stores/userStore';
const { jwt } = useUserStore();

type QueryParams = { [key: string]: string | number | boolean; };
type BodyParams = { [key: string]: string | number | boolean; };

const api = {
    endpoint: 'http://localhost:5093/',

    set_token: function (token: string) {
        localStorage.setItem('token', token);
    },

    get_token: function () {
        // return localStorage.getItem('token');
    },

    remove_token: function () {
        // localStorage.removeItem("token");
    },

    get: async function (uri: string, obj: QueryParams = {}): Promise<any> {
        const query = Object.keys(obj)
            .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
            .join('&');

        // Creates endpoint
        const url = this.endpoint + uri + "?" + query;

        // Request
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
                // 'token': this.get_token()
            },
            redirect: 'follow'
        });

        return response.json();
    },

    post: async function (uri: string, obj: BodyParams = {}, method = "POST") {

        // Creates endpoint
        const url = this.endpoint + uri;

        // Request
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
                // 'token': this.get_token()
            },
            redirect: 'follow',
            body: JSON.stringify(obj)
        });

        console.log(obj);

        return response.json();
    },

    put: async function (uri: string, obj: BodyParams = {}) {
        return this.post(uri, obj, "PUT");
    },

    del: async function (uri: string, obj: BodyParams = {}) {
        return this.post(uri, obj, "DELETE");
    },
};

// function requestOptionsBuilder(method?: string): RequestInit {
//     return {
//         body: BodyInit | null,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${jwt}`
//         },
//         method: method ?? "GET",
//         redirect: "follow",
//     };
// }

export default api;