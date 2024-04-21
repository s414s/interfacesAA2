import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// const vuetify = 
// const pinia = createPinia();

createApp(App)
    .use(createVuetify({ components, directives }))
    .use(createPinia())
    .use(router)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app');