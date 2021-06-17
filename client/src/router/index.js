import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import CreateNew from '../views/CreateNew.vue'
import MyCampaigns from '../views/MyCampaigns.vue'
import Form from '../views/Form.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/create',
        name: 'CreateNew',
        component: CreateNew
    },
    {
        path: '/mycampaigns',
        name: 'MyCampaigns',
        component: MyCampaigns
    },
    {
        path: '/form',
        name: 'Form',
        component: Form
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router