import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VueSpinners from 'vue-spinners';

createApp(App)
    .use(VueSweetalert2)
    .use(router)
    .use(VueSpinners)
    .mount('#app')
