import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App)
    .use(VueSweetalert2)
    .use(router)
    .mount('#app')
